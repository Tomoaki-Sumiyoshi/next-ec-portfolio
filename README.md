# Next EC Portfolio

ECサイトを題材に、フロントエンドからAPI、データベース、API契約までを一通り学ぶためのポートフォリオです。商品一覧、カート、チェックアウト、注文作成、注文履歴というECの基本フローを、TypeScriptとGoによるモノレポとして実装しています。

## 学習テーマ

- Next.js App Routerによる画面・サーバー機能の実装
- 機能単位の分割とRepository / UseCaseによる責務分離
- GoとPostgreSQLによるHTTP API・永続化
- OpenAPIを正本としたTypeScript / Goの型生成
- Docker ComposeによるローカルDB、Vercel / Neonを想定したデプロイ構成

## システム構成

```text
ブラウザ
   │ /api/products, /api/orders
   ▼
Next.js（apps/web）
   │ Route HandlerがAPI_BASE_URLへ転送
   ▼
Go API（apps/api）
   │ DATABASE_URL
   ▼
PostgreSQL（ローカル: Docker / 本番想定: Neon）
```

カートとユーザーIDはブラウザの `localStorage`、注文直前の入力情報は `sessionStorage` に保存します。商品と確定した注文はAPIを通してPostgreSQLへ保存します。

## リポジトリ構成

| パス | 役割 | 詳細 |
| --- | --- | --- |
| `apps/web` | Next.jsフロントエンドとAPIプロキシ | [README](apps/web/README.md) |
| `apps/api` | Go API（Vercel Functions） | [README](apps/api/README.md) |
| `infra/db` | PostgreSQLの初期化・マイグレーションSQL | [README](infra/db/README.md) |
| `openapi` | WebとAPIが共有するAPI契約 | [README](openapi/README.md) |
| `docker-compose.yml` | ローカルPostgreSQL | このREADMEで説明 |

## 主な技術

| 領域 | 技術 |
| --- | --- |
| Web | Next.js 16、React 19、TypeScript、Mantine、Zustand、Zod、Sass |
| API | Go 1.26、Vercel Functions、oapi-codegen |
| DB | PostgreSQL 16、Docker Compose、Neon（本番想定） |
| API契約 | OpenAPI 3.0.3、typed-openapi |

## ローカル開発

Node.js、npm、Go、Docker、Vercel CLIを利用します。3つのターミナルでDB、API、Webを起動します。

### 1. DBを起動

リポジトリルートで実行します。

```bash
docker compose up -d
```

### 2. Go APIを起動

```bash
cd apps/api
cp .env.example .env
vercel dev --listen 8000
```

Windows PowerShellでは `cp` の代わりに `Copy-Item .env.example .env` も利用できます。

### 3. Webを起動

```bash
cd apps/web
npm install
cp .env.example .env.local
npm run dev
```

ブラウザで <http://localhost:3000> を開きます。`.env.example` の初期値は、Webが `localhost:8000` のGo APIへ接続する構成です。

## 動作確認

```bash
cd apps/web
npm run lint
npm run build

cd ../api
go test ./...
go build ./...
```

API契約を変更する場合は、先に [OpenAPI README](openapi/README.md) の手順に従って両言語のコードを再生成してください。

## 現在の範囲

学習用のため、決済処理、認証・認可、在庫管理、管理画面は未実装です。ユーザーIDはブラウザで生成して保持し、注文データはデモ用途として作成から24時間後に定期削除する設計です。
