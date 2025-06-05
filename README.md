# Gourmet-Travel-app 　

## 全国の名物食べ歩き、スタンプを集めて旅気分！

![トップ画像](https://i.ibb.co/HpHVcVpg/a6932050fde2.jpg)

「このアプリがあると、旅の記録が一段と面白くなるな〜」

- 食べた料理を投稿するとスタンプがもらえる  
  スタンプ数に応じてバッジ GET！

- スタンプを貯めると地図が埋まる  
  スタンプ数に応じて地図の色が変化！

  ### 旅と食をかけ合わせた記録アプリです！！

## サービス URL

早速投稿してみよう！  
https://gourmet-travel-app-29ug.onrender.com/

## 機能一覧　　

| ログイン                                                                    | ユーザ登録                                                |
| --------------------------------------------------------------------------- | --------------------------------------------------------- |
| ![ログイン](https://i.ibb.co/NdL3HZ1V/408d9534a623.jpg)                     | ![ユーザ登録](https://i.ibb.co/YBmVy8bZ/336d35104b88.jpg) |
| 登録したユーザーでのログイン、Google でログインから選択してログインします。 | Google でログインしない新規ユーザーの方は新規登録をします |

| ホーム                                                | メニュー                                                |
| ----------------------------------------------------- | ------------------------------------------------------- |
| ![ホーム](https://i.ibb.co/KxbqBRWS/6ae929df4d10.jpg) | ![メニュー](https://i.ibb.co/6c80X6hL/9c6a73347346.jpg) |
| あなたが投稿した投稿一覧です                          | ホームのハンバーガーメニューから各ページへ移動します    |

| 新規投稿                                                       | 地図モード１                                                                     |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| ![新規投稿](https://i.ibb.co/xKGNgnbs/447e8a4f4dc8.jpg)        | ![地図モード１](https://i.ibb.co/q6ny7mX/f2310b2f2773.jpg)                       |
| 画像、料理名、コメント、ランクをつけて投稿することができます。 | 地図モード１では、地図に立ったピンをクリックすると投稿した画像と料理名が見れます |

| 地図モード２                                                | スタンプ                                                |
| ----------------------------------------------------------- | ------------------------------------------------------- |
| ![地図モード２](https://i.ibb.co/PzZD6n8X/ce12758ad2a5.jpg) | ![スタンプ](https://i.ibb.co/q3073prb/70637ae50cfc.jpg) |
| 地図モード２では、スタンプの獲得状況に応じて色が変化します  | 県ごとに溜まったスタンプの閲覧ができます                |

#### 地図モード２やスタンプ機能では、スタンプ数に対応して色やバッジが変化します

| 回数         | 色       | バッジ |
| ------------ | -------- | ------ |
| １〜４回     | ブルー   |
| ５〜９回     | ブロンズ | 🥉     |
| １０〜１９回 | シルバー | 🥈     |
| ２０回〜     | ゴールド | 🥇     |

## インストール

- [ ] このレポジトリをクローンした後、 `cd server && npm install` と `cd ../client && npm install` を実行して必要なパッケージをインストールしてください。
- [ ] 次の作業では、 `npm run build` を実行して静的ファイルをビルドします。次に `client`にある `dist` ディレクトリを`sever/public`にコピーします。
- [ ] 次の作業では、ローカル環境で Postgres が起動している必要があります。ターミナルから`psql`で Postgres のインスタンスを起動し、`travel_app` という名前のデータベースを作成してください。
  > **補足**:  
  > データベースを作成するための `psql` クエリは `CREATE DATABASE travel_app;` です。
             migration を実行するコマンドは `npm run migrate-latest` です。
             seed を実行するコマンドは `npm run db:seed` です。
- [ ] 次の作業では、`sever/`直下に`.env`ファイルを作成し以下の環境変数を設定してください。

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

<img src="https://img.shields.io/badge/-React-00bfff.svg?logo=react&style=flat">
<img src="https://img.shields.io/badge/-mui-8a2be2.svg?logo=mui&style=flat">
<img src="https://img.shields.io/badge/-Express-ffa500.svg?logo=express&style=flat">
<img src="https://img.shields.io/badge/-Knex.js-D26B38.svg?logo=Knex.js&style=flat">
<img src="https://img.shields.io/badge/-Postgre-00ffff.svg?logo=postgresql&style=flat">
<img src="https://img.shields.io/badge/-Render-000000.svg?logo=Render&style=flat">
<img src="https://img.shields.io/badge/-Axios-5A29E4.svg?logo=Axios&style=flat">
<img src="https://img.shields.io/badge/-Passport-34E27A.svg?logo=Passport&style=flat">
<img src="https://img.shields.io/badge/-D3-F9A03C.svg?logo=D3&style=flat">
<img src="https://img.shields.io/badge/-Leaflet-199900.svg?logo=Leaflet&style=flat">
<img src="https://img.shields.io/badge/-Vite-646CFF.svg?logo=Vite&style=flat">

## ディレクトリ構成

25/6/5 地点

```
.
├── README.md
├── client
│   ├── README.md
│   ├── dist
│   │   ├── assets
│   │   │   ├── index-CMpM0-A1.js
│   │   │   └── index-CizA-gra.css
│   │   ├── favicon.ico
│   │   ├── faviconTrip.png
│   │   ├── index.html
│   │   └── vite.svg
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── faviconTrip.png
│   │   ├── logo-black.png
│   │   └── vite.svg
│   ├── src
│   │   ├── app
│   │   │   ├── App.jsx
│   │   │   └── index.css
│   │   ├── assets
│   │   │   ├── 07DAABE4-7654-4506-A67D-893E0DEC5E7F.png
│   │   │   ├── 2023639.jpg
│   │   │   ├── 24985480.png
│   │   │   ├── 435853.png
│   │   │   ├── 435950.png
│   │   │   └── appIcon.png
│   │   ├── components
│   │   │   ├── Header
│   │   │   │   ├── GetBadge.jsx
│   │   │   │   ├── Header.css
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── MenuBar.jsx
│   │   │   │   └── RecordForm.jsx
│   │   │   └── commonFunc
│   │   │       └── fetchFn.js
│   │   ├── features
│   │   │   ├── login
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── LogoutBtn.jsx
│   │   │   │   ├── RegisterForm.jsx
│   │   │   │   └── RegisterPage.jsx
│   │   │   └── records
│   │   │       ├── Records.css
│   │   │       ├── RecordsList.jsx
│   │   │       ├── RecordsPage.jsx
│   │   │       ├── map
│   │   │       │   ├── JapanMap.jsx
│   │   │       │   ├── MapContent.jsx
│   │   │       │   └── MapPage.jsx
│   │   │       ├── mypage
│   │   │       │   └── MyPage.jsx
│   │   │       └── stamp
│   │   │           ├── PrefectureList.jsx
│   │   │           ├── Stamp.jsx
│   │   │           ├── StampCard.jsx
│   │   │           └── StampPage.jsx
│   │   ├── hooks
│   │   │   └── useWindowSize.jsx
│   │   ├── main.jsx
│   │   └── utils
│   │       └── japan.json
│   └── vite.config.js
├── package-lock.json
└── server
    ├── app.js
    ├── db.js
    ├── index.js
    ├── knexfile.js
    ├── migrations
    │   ├── 20250528010718_make-table-users.js
    │   ├── 20250528011616_make-table-sessions.js
    │   └── 20250528011623_make-table-stamp.js
    ├── package-lock.json
    ├── package.json
    ├── passport.js
    ├── public
    │   ├── assets
    │   │   ├── index-CMpM0-A1.js
    │   │   └── index-CizA-gra.css
    │   ├── favicon.ico
    │   ├── faviconTrip.png
    │   ├── index.html
    │   └── vite.svg
    ├── routers
    │   ├── authRouter.js
    │   ├── logo-black.png
    │   ├── mapRouter.js
    │   ├── postRouter.js
    │   ├── recordsRouter.js
    │   ├── stampRouter.js
    │   ├── temp.png
    │   └── uploadImageRouter.js
    ├── seeds
    │   ├── 001-users.js
    │   ├── 002-sessions.js
    │   └── 004-records.js
    └── test
        └── example.test.js

```

## ER 図

![ER図](https://i.ibb.co/HL3z0Z64/f0ba9aa6c67d.jpg)
