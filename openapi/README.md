# OpenAPI 契約

`openapi.yaml` はWebフロントエンドとGo APIが共有するAPIの正本（Single Source of Truth）です。エンドポイント、パラメーター、リクエスト、レスポンス、共通スキーマをOpenAPI 3.0.3で定義しています。

## 定義している領域

- 商品一覧の取得と商品IDによる絞り込み
- ユーザーID・注文IDによる注文取得
- 注文作成
- APIとDBのヘルスチェック

Vercel Cron用の注文削除エンドポイントは運用向けの内部APIであり、現在の `openapi.yaml` には含めていません。

## コード生成

契約から両アプリの型を生成します。

| 対象 | 実行場所 | コマンド | 生成先 |
| --- | --- | --- | --- |
| Web | `apps/web` | `npm run generate:api` | `src/shared/api/generated.ts` |
| Go API | `apps/api` | `go generate ./lib/openapi` | `lib/openapi/generated.go` |

生成ファイルは直接編集せず、変更が必要な場合は `openapi.yaml` を修正して再生成します。

## 変更手順

1. `openapi/openapi.yaml` の契約を更新する。
2. WebとGo APIのコードをそれぞれ再生成する。
3. ハンドラー、Repository、画面などの実装を契約に合わせる。
4. `npm run lint`、`npm run build`、`go test ./...`、`go build ./...` で確認する。
5. 契約と両方の生成ファイルを同じ変更としてコミットする。

`servers` のローカルURLはWebのRoute Handlerを入口とする `http://localhost:3000` です。WebからGo APIへの実際の接続先は `apps/web` の `API_BASE_URL` で設定します。
