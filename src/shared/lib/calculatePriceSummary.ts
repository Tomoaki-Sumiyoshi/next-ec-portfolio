import { SHIPPING_FEE, TAX_RATE } from '@/shared/constants/commerce';

type PriceSummary = {
  subtotalPrice: number;
  consumptionTax: number;
  totalPrice: number;
};

export function calculatePriceSummary(subtotalPrice: number): PriceSummary {
  const consumptionTax = subtotalPrice * TAX_RATE;
  const totalPrice = subtotalPrice + SHIPPING_FEE + consumptionTax;

  return {
    subtotalPrice,
    consumptionTax,
    totalPrice,
  };
}
