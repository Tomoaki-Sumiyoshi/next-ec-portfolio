# API

Next EC Portfolio の Go API です。

## OpenAPI 型生成

API 契約は、リポジトリ直下の OpenAPI ファイルで定義します。

```txt
../../openapi/openapi.yaml
```

このファイルを元に、`oapi-codegen` で Go のリクエスト/レスポンス用モデル型を生成します。

### 生成ファイル

```txt
lib/openapi/generated.go
```

生成ファイルは直接編集しません。`../../openapi/openapi.yaml` を更新してから、生成コマンドを再実行してください。

### 生成設定

```txt
lib/openapi/oapi-codegen.yaml
lib/openapi/generate.go
```

現在の設定では Go のモデル型のみを生成します。これは、各エンドポイントを
`Handler(w http.ResponseWriter, r *http.Request)` として実装する Vercel の
file-based function 構成に合わせた方針です。

### 型を生成する

`apps/api` から実行します。

```bash
go generate ./lib/openapi
```

このコマンドにより、`lib/openapi/generate.go` の directive が実行されます。

```go
//go:generate go tool oapi-codegen -config oapi-codegen.yaml ../../../../openapi/openapi.yaml
```

### ジェネレーターを追加または更新する

`oapi-codegen` が Go tool として未登録の場合は、`apps/api` から実行します。

```bash
go get -tool github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest
```

その後、再度生成します。

```bash
go generate ./lib/openapi
```

### 推奨ワークフロー

1. `../../openapi/openapi.yaml` を更新する。
2. `apps/api` から `go generate ./lib/openapi` を実行する。
3. `github.com/t-sumiyoshi/next-ec-portfolio/apps/api/lib/openapi` から生成型を利用する。
4. コミット前にテストやビルドチェックを実行する。

import 例:

```go
import "github.com/t-sumiyoshi/next-ec-portfolio/apps/api/lib/openapi"
```

## 注文データの定期削除

Vercel Cron Jobsから毎日日本時間0時（UTC 15:00）に、作成から24時間を超えた
`orders`を物理削除します。関連する`order_items`は外部キーの
`ON DELETE CASCADE`によって同時に削除されます。

```txt
GET /api/cron/orders-cleanup
```

Cronの呼び出しは`CRON_SECRET`で保護します。VercelプロジェクトのEnvironment
Variablesに、16文字以上のランダムな値を設定してください。

```txt
CRON_SECRET=ランダムな文字列
```

ローカルで確認する場合も、同じ値をAuthorizationヘッダーに指定します。

```bash
curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:5005/api/cron/orders-cleanup
```

## `vercel dev` のポート番号を変更して起動する

`vercel dev` はデフォルト以外のポート番号を指定して起動できます。
API のローカル起動ポートを変更したい場合は、`apps/api` から `--listen` オプションを付けて実行します。

```bash
vercel dev --listen 5005
```

短縮形の `-l` も利用できます。

```bash
vercel dev -l 5005
```

上記の例では、API は次の URL で確認できます。

```txt
http://localhost:5005/api/products
```

リポジトリルートから起動する場合は、`--cwd` で `apps/api` を指定します。

```bash
vercel dev --cwd apps/api --listen 5005
```
