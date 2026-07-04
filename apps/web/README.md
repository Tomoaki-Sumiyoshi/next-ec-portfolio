# Next EC Portfolio

学習用ポートフォリオとして作成した、シンプルな EC サイト風アプリケーションです。  
商品一覧からカート投入、チェックアウト、注文完了、注文履歴確認までの一連の流れを、`Next.js` と `TypeScript` を使って実装しています。

## このプロジェクトの目的

このアプリは、単に画面を作ることではなく、以下の観点を実践しながら学ぶことを目的にしています。

- App Router を使った Next.js アプリ開発
- TypeScript による型安全なフロントエンド実装
- Zustand を使った状態管理
- localStorage / sessionStorage を利用したブラウザ保存
- Repository / UseCase を意識した責務分離
- Zod を用いた入力値・データ構造のバリデーション
- Mantine を用いた UI 構築

## 主な機能

- 商品一覧表示
- 商品詳細モーダル表示
- カートへの追加、数量変更、削除
- チェックアウトフォーム入力
- 注文データ保存
- 決済完了画面の表示
- 注文履歴の表示

## 画面フロー

1. 商品一覧で商品を確認
2. カートに商品を追加
3. チェックアウト画面で購入者情報を入力
4. 注文を確定
5. 注文完了後に `/order` で注文内容を確認

## 使用技術

- Next.js 16
- React 19
- TypeScript
- Mantine
- Zustand
- Zod
- Sass
- ESLint / Prettier

## 設計上の学習ポイント

### 1. 機能ごとのディレクトリ分割

`features` 配下を `products` `cart` `checkout` `order` などの単位で分けています。  
画面、型、usecase、repository を機能ごとに近い位置へまとめることで、責務を追いやすい構成を意識しました。

### 2. Repository を介したデータアクセス

ストレージやデータ取得は直接コンポーネントから触らず、Repository 経由で扱っています。

- 商品データ: JSON
- カート: localStorage
- 注文履歴: localStorage
- 直前の注文 ID: sessionStorage

これにより、将来的に API 通信へ置き換える場合も、影響範囲を小さくしやすい構成にしています。

### 3. UseCase による処理の分離

たとえば注文作成や注文取得などの処理を UseCase として切り出しています。  
UI コンポーネントにロジックが集中しすぎないようにし、読みやすさと保守性を意識しました。

### 4. 型安全とバリデーション

`TypeScript` に加えて `Zod` を利用し、アプリ内で扱うデータ構造を明確化しています。  
フォーム値や保存データの検証を通じて、フロントエンド側でも破綻しにくい実装を目指しました。

## ディレクトリ構成

```txt
src/
  app/
    (shop)/
      page.tsx
      cart/page.tsx
      checkout/page.tsx
      order/page.tsx
  features/
    products/
    cart/
    checkout/
    order/
    shop-shell/
  shared/
    components/
    lib/
  data/
    products.json
```

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで以下を開きます。

```txt
http://localhost:3000
```

## 利用可能なコマンド

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## このポートフォリオで伝えたいこと

このアプリでは、見た目だけでなく以下の点も意識して実装しています。

- UI とロジックの責務分離
- 小さなアプリでも設計を意識する姿勢
- ブラウザ保存を活用した疑似 EC フローの再現
- 学習段階でも読みやすさと拡張性を考えること

## 今後の改善案

- バックエンド API と接続して注文データを永続化する
- 認証機能を追加してユーザーごとの注文履歴を管理する
- 決済フォームのマスキングや入力補助を強化する
- テストコードを追加する
- 画像、在庫、カテゴリ絞り込みなど EC サイトらしい要素を拡張する

## 補足

このリポジトリは自己学習のアウトプットとして継続的に改善していく想定です。  
実装機能だけでなく、「どのように分割し、どう責務を持たせるか」を意識して更新しています。

## OpenAPI 型生成

API 契約は、リポジトリ直下の OpenAPI ファイルで定義します。

```txt
../../openapi/openapi.yaml
```

このファイルを元に、`typed-openapi` で TypeScript のリクエスト/レスポンス型、Zod schema、型付き API client を生成します。

### 生成ファイル

```txt
src/shared/api/generated.ts
```

生成ファイルは直接編集しません。`../../openapi/openapi.yaml` を更新してから、生成コマンドを再実行してください。

手書きの client wrapper はここに置きます。

```txt
src/shared/api/api.client.ts
```

アプリケーションコードからは、生成された client 設定を直接 import せず、この wrapper を利用します。

### 型を生成する

`apps/web` から実行します。

```bash
npm run generate:api
```

script は `package.json` に定義されています。

```json
"generate:api": "typed-openapi ../../openapi/openapi.yaml -o src/shared/api/generated.ts --runtime zod --default-fetcher --format"
```

### API Base URL

API の origin は環境変数で管理します。

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

本番環境では、`NEXT_PUBLIC_API_BASE_URL` にデプロイ済み API の origin を設定します。
例:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api.vercel.app
```

この値は `src/shared/api/api.client.ts` から参照されます。

### 推奨ワークフロー

1. `../../openapi/openapi.yaml` を更新する。
2. `apps/web` から `npm run generate:api` を実行する。
3. `@/shared/api/api.client` から `api` を import して利用する。
4. コミット前に `npm run lint` を実行する。
