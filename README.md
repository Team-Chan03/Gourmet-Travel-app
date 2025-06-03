# Gourmet-Travel-app　
## 全国の名物食べ歩き、ポイントを集めて旅気分！
- 食べた料理を投稿するたでポイントがもらえる！
- ポイントを貯めると地図が埋める！


## コンテンツ一覧

- [サービスURL](#サービスURL)
- [機能一覧](#機能一覧)


## サービスURL
<span style="color:red;">あとで入力 赤文字あとで消す</span>

## 機能一覧　　<span style="color:red;">CSS整えれたら画像貼る</span>

| ログイン | ユーザ登録|
|---|---|
|||
| 登録したユーザーでのログイン、Googleでログインから選択してログインします。|Googleでログインしない新規ユーザーの方は新規登録をします|


| ホーム | メニュー |
|---|---|
|||
|あなたが投稿した投稿一覧です|ホームのハンバーガーメニューから各ページへ移動します|

| 新規投稿 | 地図モード１ |
|---|---|
|||
|画像、料理名、コメント、ランクをつけて投稿することができます。|地図モード１では、地図に立ったピンをクリックすると投稿した画像と料理名が見れます|

| 地図モード２ | スタンプ |
|---|---|
|||
|地図モード２では、スタンプの獲得状況に応じて色が変化します|県ごとに溜まったスタンプの閲覧ができます|

#### 地図モード２やスタンプ機能では、スタンプ数に対応して色やバッジが変化します
| 回数 | 色 | バッジ |
|---|---|---|
| １〜４回 | ブルー | 
| ５〜９回 | ブロンズ | 🥉 |
| １０〜１９回 | シルバー | 🥈 |
| ２０回〜 | ゴールド | 🥇 |


## インストール
- [ ] このレポジトリをクローンした後、 `cd server && npm install` と `cd ../client && npm install` を実行して必要なパッケージをインストールしてください。
- [ ] 次の作業では、 `npm run build` を実行して静的ファイルをビルドします。次に `client`にある `dist` ディレクトリを`sever/public`にコピーします。
- [ ] 次の作業では、ローカル環境で Postgres が起動している必要があります。ターミナルから`psql`でPostgres のインスタンスを起動し、`travel_app` という名前のデータベースを作成してください。
  > **補足**: データベースを作成するための `psql` クエリは `CREATE DATABASE travel_app;` です。
             migration を実行するコマンドは `npm run migrate-latest` です。
             seed を実行するコマンドは `npm run db:seed` です。
- [ ] 次の作業では、`sever/`直下に`.env`ファイルを作成し以下の環境変数を設定してください。

<br>

/client/.env
```
VITE_BACKEND_URL=http://localhost:4000
```

/server/.env
```
NODE_ENV=development
DB_NAME=travel_app
DB_USER=//データベースのユーザー名

//以下は**から取得
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

FRONT_URL=http://localhost:5173/

//以下はIMG BBから取得
IMGBB_API_KEY=

//DeveloperPortal(https://developer.x.com/)から取得
APP_KEY=
APP_KEY_SWCRET=
ACCES_TOKEN=
ACCES_TOKEN_SECRET=
```
## 使用技術一覧

## ディレクトリ構成

## ER図

