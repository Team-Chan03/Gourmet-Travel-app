const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();
const db = require("./db");
const crypto = require("crypto");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        //google profileからemail, name取得
        const email = profile.email;
        const username = profile.displayName;

        //usersテーブルに存在するか確認
        let user = await db("users").where({ email }).first();

        //なければusersテーブルに登録
        if (!user) {
          const [newUser] = await db("users")
            .insert({
              username,
              email,
              salt: null,
              password: null,
              created_at: new Date(),
            })
            .returning("*");
          user = newUser;
        }

        //セッションIDを作成してsessionテーブルに保存
        const sessionId = crypto.randomBytes(16).toString("hex");
        await db("sessions").insert({
          sessions_id: sessionId,
          user_id: user.user_id,
          created_at: new Date(),
        });

        //作成したセッションIDをrequestオブジェクトに渡す
        request.sessionId = sessionId;
        return done(null, user); //req.user
      } catch (err) {
        console.error("Google認証エラー：", err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
