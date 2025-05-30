# Gourmet-Travel-app

- [ ] このレポジトリをクローンした後、 `cd server　npm install` を実行して必要なパッケージをインストールしてください。
- [ ] 次の作業では、 `npm build` を実行して client ディレクトリにあるコードを`sever/public`にビルドします。
- [ ] 次の作業では、ローカル環境で Postgres が起動している必要があります。Postgres のインスタンスを起動し、`travel_app` という名前のデータベースを作成してください。
  > **補足**: データベースを作成するための `psql` クエリは `CREATE DATABASE travel_app;` です。
- [ ] 次の作業では、`sever/`直下に`.env`ファイルを作成し以下の環境変数を設定してください。GOOGLE_CLIENT_ID と GOOGLE_CLIENT_SECRET は、`https://console.cloud.google.com/welcome/new?inv=1&invt=Abyu6Q`で設定必要です。IMGBB_API_KEY は`https://waction.org/imgbb-api/`参考に設定してください。

```
DB_NAME=travel_app
DB_USER=<yourusername> //DB作成時のユーザーネームです。

GOOGLE_CLIENT_ID=<Google cloud consoleで設定> //passport.jsに使います
GOOGLE_CLIENT_SECRET=<Google cloud consoleで設定>　//passport.jsに使います
GOOGLE_CALLBACK_URL=/api/auth/google/callback　//passport.jsに使います

FRONT_URL=http://localhost:5173/
# FRONT_URL=http://localhost:4000/ //sever側だけで見る時はこっち

IMGBB_API_KEY=<上記参照> //画像のアップロードに使います
```

- [ ] 次の作業では、`client/`直下に`.env`ファイルを作成し以下の環境変数を設定してください。

```
VITE_BACKEND_URL=http://localhost:4000
```
