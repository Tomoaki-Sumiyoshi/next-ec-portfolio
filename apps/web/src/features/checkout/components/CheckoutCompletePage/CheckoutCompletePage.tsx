'use client';

import PageHeader from '@/shared/components/PageHeader';

import CheckoutCompletePageView from './CheckoutCompletePageView';

export default function CheckoutCompletePage() {
  return (
    <>
      <PageHeader
        title="ご注文ありがとうございます"
        description="購入完了後の確認画面です。注文内容は注文履歴からも参照できます。注文情報は購入完了から24時間以上経過すると自動的に削除されます。"
        badge="Complete"
      />
      <CheckoutCompletePageView />
    </>
  );
}
