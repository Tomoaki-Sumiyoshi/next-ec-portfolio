'use client';

import PageHeader from '@/shared/components/PageHeader';

import OrderPageView from './OrderPageView';

export default function OrderPage() {
  return (
    <>
      <PageHeader
        title="注文履歴"
        description="これまでの注文内容と、直近の購入結果を確認できます。"
        badge="Orders"
      />
      <OrderPageView />
    </>
  );
}
