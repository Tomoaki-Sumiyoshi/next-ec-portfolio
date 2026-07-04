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
