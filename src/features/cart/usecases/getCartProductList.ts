import { Cart } from '@/features/cart/types/cart';
import { Product } from '@/features/products/types/product';
import { getProductListByIds } from '@/features/products/usecases/getProductListByIds';

export async function getCartProductList(cart: Cart): Promise<Product[]> {
  const productIds = Object.keys(cart);
  if (productIds.length === 0) {
    return [];
  }

  return getProductListByIds(productIds);
}
