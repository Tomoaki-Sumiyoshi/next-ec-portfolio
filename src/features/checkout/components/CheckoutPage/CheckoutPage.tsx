'use client';

import PageHeader from '@/shared/components/PageHeader';

import CheckoutPageView from './CheckoutPageView';

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        title="お支払い"
        description="配送先とお支払い情報を入力して、注文内容を確認します。"
        badge="Checkout"
      />
      <CheckoutPageView />
    </>
  );
}
