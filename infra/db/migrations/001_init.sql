CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price >= 0),
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO products (id, name, price, image_url, description)
VALUES
  ('p001', 'ワイヤレスマウス', 2980, 'https://placehold.co/600x400?text=Mouse', '静音クリック対応の軽量ワイヤレスマウス。USBレシーバー付き。'),
  ('p002', 'メカニカルキーボード', 12800, 'https://placehold.co/600x400?text=Keyboard', '青軸スイッチ採用の高耐久メカニカルキーボード。RGBバックライト搭載。'),
  ('p003', '27インチモニター', 24800, 'https://placehold.co/600x400?text=Monitor', 'フルHD解像度のIPSパネルを採用した薄型ディスプレイ。'),
  ('p004', 'USB-Cハブ', 3980, 'https://placehold.co/600x400?text=USB-C+Hub', 'HDMI・USB-A・SDカードスロットを備えた多機能ハブ。'),
  ('p005', 'ノートパソコンスタンド', 3200, 'https://placehold.co/600x400?text=Stand', 'アルミ製の折りたたみ式スタンド。高さと角度の調整が可能。'),
  ('p006', 'Bluetoothヘッドホン', 9800, 'https://placehold.co/600x400?text=Headphones', 'ノイズキャンセリング機能付きのワイヤレスヘッドホン。'),
  ('p007', 'ポータブルSSD 1TB', 15800, 'https://placehold.co/600x400?text=SSD', '高速転送に対応したUSB 3.2接続の外付けSSD。'),
  ('p008', 'スマートフォン三脚', 2200, 'https://placehold.co/600x400?text=Tripod', 'リモコンシャッター付きの軽量三脚。動画撮影に最適。'),
  ('p009', 'LEDデスクライト', 4500, 'https://placehold.co/600x400?text=Desk+Light', '調光・調色機能を備えた省エネLEDライト。'),
  ('p010', 'ゲーミングマウスパッド', 1800, 'https://placehold.co/600x400?text=Mousepad', '滑り止めラバー加工の大型マウスパッド。'),
  ('p011', 'ウェブカメラ', 5200, 'https://placehold.co/600x400?text=Webcam', 'フルHD録画対応のUSB接続ウェブカメラ。内蔵マイク付き。'),
  ('p012', 'ワイヤレス充電器', 2600, 'https://placehold.co/600x400?text=Charger', 'Qi規格対応の急速ワイヤレス充電パッド。'),
  ('p013', 'スマートウォッチ', 11800, 'https://placehold.co/600x400?text=Watch', '心拍数・歩数・睡眠を計測できる多機能スマートウォッチ。'),
  ('p014', 'バックパック', 6800, 'https://placehold.co/600x400?text=Backpack', '防水素材を使用した15インチPC対応ビジネスリュック。'),
  ('p015', 'モバイルバッテリー 20000mAh', 5400, 'https://placehold.co/600x400?text=Battery', '急速充電対応の大容量モバイルバッテリー。')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  image_url = EXCLUDED.image_url,
  description = EXCLUDED.description,
  updated_at = now();
