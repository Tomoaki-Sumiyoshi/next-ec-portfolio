# Web フロントエンド

ECサイトの画面と、ブラウザ側の状態管理を担当する Next.js アプリケーションです。商品閲覧からカート、購入情報入力、注文完了、注文履歴までの一連の操作を実装しています。

プロジェクト全体の構成と起動手順は [ルートの README](../../README.md) を参照してください。

## 主な機能

- 商品一覧と商品詳細モーダル
- カートへの追加、数量変更、削除
- 購入者・配送先情報の入力とバリデーション
- 注文の作成、注文完了画面、注文履歴
- 読み込み中、空データ、エラー状態の共通表示

## 技術構成

- Next.js 16（App Router） / React 19 / TypeScript
- Mantine / Sass Modules
- Zustand（クライアント状態）
- Zod（フォーム・データ検証）
- typed-openapi（OpenAPIからAPIクライアントと型を生成）
- ESLint / Prettier

## 設計

`src/features` を機能単位に分け、画面・UseCase・Repository・スキーマを近い場所へまとめています。UIから保存先や通信処理を直接扱わず、Repositoryを介してアクセスします。

| データ | 保存先 |
| --- | --- |
| 商品・注文 | Go API（Next.js Route Handler経由） |
| カート・ユーザーID | `localStorage` |
| 注文直前のチェックアウト情報 | `sessionStorage` |

`src/app/api` のRoute HandlerはブラウザとGo APIの間のプロキシです。ブラウザは同一オリジンの `/api/*` を呼び、サーバー側だけが `API_BASE_URL` を参照します。

```text
src/
├─ app/                 # App Routerのページ、レイアウト、APIプロキシ
├─ features/            # products、cart、checkout、order、userなど
├─ shared/              # 共通UI、定数、ユーティリティ、APIクライアント
└─ data/                # フロントエンド単体実装時の商品JSON（参考）
```

## 環境変数

`.env.example` を `.env.local` にコピーして利用します。

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
API_BASE_URL=http://localhost:8000
```

- `NEXT_PUBLIC_API_BASE_URL`: 生成クライアントの接続先。通常はWebアプリ自身のオリジンを指定します。
- `API_BASE_URL`: Route HandlerからGo APIへ接続するURLです。

## 開発コマンド

`apps/web` で実行します。

```bash
npm install
npm run dev
npm run lint
npm run build
```

開発サーバーは通常 <http://localhost:3000> で起動します。APIを使う画面を確認する場合は、別ターミナルでDBとGo APIも起動してください。

## APIクライアントの生成

API契約を変更したら、先に `openapi/openapi.yaml` を更新し、次を実行します。

```bash
npm run generate:api
```

生成先は `src/shared/api/generated.ts` です。このファイルは直接編集しません。契約変更の流れは [OpenAPI README](../../openapi/README.md) にまとめています。
