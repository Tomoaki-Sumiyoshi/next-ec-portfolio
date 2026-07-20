# Go API

商品と注文をPostgreSQLへ永続化する、Go製のHTTP APIです。Vercel Functionsのファイルベースルーティングに合わせ、各 `api/**/index.go` が `Handler` を公開します。

プロジェクト全体の起動手順は [ルートの README](../../README.md) を参照してください。

## エンドポイント

| メソッド | パス | 用途 |
| --- | --- | --- |
| `GET` | `/api/products` | 商品一覧取得。`ids` でカンマ区切りの絞り込みが可能 |
| `GET` | `/api/orders` | `userId` または `id` のどちらか一方で注文を検索 |
| `POST` | `/api/orders` | 注文作成 |
| `GET` | `/api/health` | APIの稼働確認 |
| `GET` | `/api/health/db` | DB接続確認 |
| `GET` | `/api/cron/orders-cleanup` | 24時間より古い注文を削除 |

リクエストとレスポンスの正確な定義は [OpenAPI README](../../openapi/README.md) と `openapi/openapi.yaml` を参照してください。

## ディレクトリ構成

```text
apps/api/
├─ api/                 # Vercel FunctionsのHTTPハンドラー
│  ├─ products/
│  ├─ orders/
│  ├─ health/
│  └─ cron/orders-cleanup/
├─ lib/
│  ├─ db/               # PostgreSQL接続
│  ├─ products/         # 商品のDB操作
│  ├─ orders/           # 注文のDB操作と削除処理
│  └─ openapi/          # Go型の生成設定と生成物
└─ vercel.json          # Cron Jobs設定
```

## 環境変数

`.env.example` を `.env` にコピーして利用します。

| 変数 | 用途 |
| --- | --- |
| `DATABASE_URL` | PostgreSQL接続文字列 |
| `CORS_ALLOWED_ORIGINS` | CORS制御用の予約値（現時点の実装では未使用） |
| `APP_ENV` | 実行環境判定用の予約値（現時点の実装では未使用） |
| `CRON_SECRET` | 注文削除エンドポイントのBearer認証キー |

本番の接続情報や秘密値はVercelのEnvironment Variablesへ設定し、リポジトリへコミットしません。

## ローカル起動

ルートでDBを起動した後、`apps/api` でVercel CLIを実行します。

```bash
vercel dev --listen 8000
```

起動後は、たとえば <http://localhost:8000/api/health/db> でDB接続を確認できます。

## 開発・検証コマンド

`apps/api` で実行します。

```bash
go test ./...
go build ./...
go generate ./lib/openapi
```

OpenAPIから生成される `lib/openapi/generated.go` は直接編集しません。生成設定は `lib/openapi/oapi-codegen.yaml`、生成指示は `lib/openapi/generate.go` にあります。

## 注文データの定期削除

Vercel Cron Jobsが毎日 `0 15 * * *`（UTC、JSTでは午前0時）に削除エンドポイントを呼び、作成から24時間を超えた注文を削除します。関連する `order_items` も外部キーの `ON DELETE CASCADE` で削除されます。

ローカルで試す場合は、APIに設定した値と同じ `CRON_SECRET` をBearerトークンとして送ります。

```bash
curl -H "Authorization: Bearer <CRON_SECRET>" http://localhost:8000/api/cron/orders-cleanup
```
