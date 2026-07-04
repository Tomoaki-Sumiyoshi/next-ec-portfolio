# DB 運用管理手順

このディレクトリでは、ローカル開発用 PostgreSQL の初期化 SQL と、将来的なスキーマ変更用のマイグレーション SQL を管理します。

## ディレクトリ構成

```txt
infra/db/
  init/
    001_init.sql
  migrations/
```

`init` は Docker PostgreSQL の初回起動時にだけ実行される SQL を置く場所です。現在は `products` テーブルの作成と初期商品データの投入を行います。

`migrations` は DB スキーマの変更履歴を置く場所です。今後、注文テーブルの追加やカラム追加などを行う場合は、番号付き SQL として追加します。

## ローカル DB の起動

リポジトリルートから実行します。

```bash
docker compose up
```

`docker-compose.yml` では、`infra/db/init` を PostgreSQL コンテナの `/docker-entrypoint-initdb.d` にマウントしています。

```yaml
volumes:
  - postgres_data:/var/lib/postgresql/data
  - ./infra/db/init:/docker-entrypoint-initdb.d:ro
```

PostgreSQL 公式イメージは、データディレクトリが空の初回起動時に `/docker-entrypoint-initdb.d` 配下の `.sql` をファイル名順に実行します。

## 初期化 SQL

初期化 SQL は次のファイルで管理します。

```txt
infra/db/init/001_init.sql
```

このファイルの役割は、空のローカル DB をアプリが動作できる最低限の状態にすることです。

現在の内容は以下です。

```txt
products テーブルの作成
products.json 相当の初期商品データ投入
```

`001_init.sql` は初回起動時だけ実行されます。既に `postgres_data` volume が存在する状態で SQL を変更しても、自動では再実行されません。

## ローカル DB を作り直す

初期化 SQL を変更して最初から反映したい場合は、ローカル DB の volume を削除してから起動します。

```bash
docker compose down -v
docker compose up
```

`docker compose down -v` はローカル DB のデータを削除します。残したいデータがある場合は実行しないでください。

## マイグレーション SQL

将来的なスキーマ変更は `migrations` に追加します。

```txt
infra/db/migrations/
  001_create_products.sql
  002_create_orders.sql
  003_add_product_stock.sql
```

マイグレーション SQL は、ローカル DB と本番 DB の状態を同じ順番で更新するための履歴です。一度適用した SQL は基本的に編集せず、変更が必要な場合は新しい番号の SQL を追加します。

例:

```txt
良い:
004_add_order_status.sql

避ける:
001_create_products.sql を後から書き換える
```

現時点ではマイグレーション実行ツールは未導入です。注文機能や本番 Neon 反映が必要になった段階で、`goose`、`atlas`、`tern` などの導入を検討します。

## ローカル DB と本番 DB

ローカル開発では Docker PostgreSQL を使います。

```txt
postgres://app:password@localhost:5432/app_local?sslmode=disable
```

本番では Neon PostgreSQL を使います。本番の接続情報は Vercel の Environment Variables に設定し、リポジトリにはコミットしません。

```txt
DATABASE_URL=Neon の接続文字列
```

ローカルと本番で同じ `DATABASE_URL` という環境変数名を使い、値だけを環境ごとに切り替えます。
