CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  full_name TEXT NOT NULL CHECK (char_length(full_name) >= 2),
  email TEXT NOT NULL,
  post_code TEXT NOT NULL CHECK (post_code ~ '^[0-9]{3}-[0-9]{4}$'),
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id_created_at
  ON orders (user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS order_items (
  order_id UUID NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products (id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  market_price BIGINT NOT NULL CHECK (market_price >= 0),
  PRIMARY KEY (order_id, product_id)
);
