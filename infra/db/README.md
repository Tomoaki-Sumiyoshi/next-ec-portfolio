# データベース

ローカル開発用PostgreSQLの初期化SQLと、スキーマ変更履歴を管理します。APIからの接続方法は [Go API README](../../apps/api/README.md) を参照してください。

## 構成

```text
infra/db/
├─ init/
│  └─ 001_init.sql              # 空のDocker volumeを初期化
└─ migrations/
   ├─ 001_init.sql              # productsテーブルと初期商品
   └─ 002_create_orders.sql     # orders、order_itemsテーブル
```

管理する主なテーブルは次のとおりです。

| テーブル | 内容 |
| --- | --- |
| `products` | 商品情報。15件の学習用初期データを含む |
| `orders` | 注文者、配送先、作成日時 |
| `order_items` | 注文明細。注文削除時に連動して削除 |

## ローカルDBの起動

リポジトリルートで実行します。

```bash
docker compose up -d
```

接続情報は `docker-compose.yml` に定義されています。

```text
postgres://app:password@localhost:5432/app_local?sslmode=disable
```

`init/001_init.sql` は `postgres_data` volumeが空の初回起動時だけ自動実行されます。既存volumeに対してSQLを変更しても自動では再実行されません。

## 初期化とマイグレーションの扱い

- `init/001_init.sql`: 新規ローカル環境を現在のスキーマへ一度で初期化するためのSQLです。
- `migrations/*.sql`: スキーマを変更順に適用するための履歴です。一度適用したファイルは書き換えず、新しい連番ファイルを追加します。

現時点ではマイグレーション実行ツールを導入していません。本番DBなど既存環境への適用は、対象環境と適用済み番号を確認したうえで番号順に行ってください。

## ローカルDBの作り直し

次の操作はDocker volume内のローカルデータをすべて削除します。残したいデータがないことを確認してから実行してください。

```bash
docker compose down -v
docker compose up -d
```

本番環境ではNeon PostgreSQLを想定し、接続文字列は `DATABASE_URL` としてデプロイ環境へ設定します。
