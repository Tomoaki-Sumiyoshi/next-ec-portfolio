import raw from '@/data/products.json';

import { ProductsSchema, Product } from '../domain/product.schema';

export function loadProducts(): Product[] {
  // parse: 不正なら例外（開発時に即気づける）
  return ProductsSchema.parse(raw);
}
