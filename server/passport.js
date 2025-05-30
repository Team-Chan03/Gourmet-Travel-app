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
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true, //verify関数でrequestオブジェクトを使いたいならtrue.第１引数を requestにする
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
        //passport.jsの認証フロー用のコールバック関数。done(error, user, [info]) errorやuserなければnull
        return done(null, user); //req.user=userを設定してくれる。
      } catch (err) {
        console.error("Google認証エラー：", err);
        return done(err, null);
      }
    }
  )
);

//下記はexpress-sessionなどでセッションID管理する時の処理。自前でセッションID作成するなら不要？？？

//ログイン後、セッションに何を保存するかを決める。ここではuserオブジェクト全体。user.user_idとかもできる
//サーバー側でセッションIDを保存(req.sessionID)。このセッションIDがクッキーに保存される（express-sessionで作成）
//verify関数ないで自前で作ってる request.sessionId = sessionId;とは別。今回express-sessionはログイン状態の確認に使ってない
passport.serializeUser((user, done) => {
  done(null, user);
});

//ログイン後のアクセス時、serializeUserで保存されたセッションからuserを復元。req.userに入れる
passport.deserializeUser((user, done) => {
  done(null, user);
});
