'use client';

import { Alert, Card, Divider, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useCartStore } from '@/features/cart/store/cart.store';
import { OrderRequestParam } from '@/features/order/types/order';
import { setOrder } from '@/features/order/usecase/setOrder';
import { Product } from '@/features/products/types/product';
import { ROUTES } from '@/shared/constants/routes';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';

import CheckoutCustomerSection from './CheckoutCustomerSection';
import CheckoutFormActions from './CheckoutFormActions';
import CheckoutPaymentSection from './CheckoutPaymentSection';
import { setCheckout } from '../../usecase/setCheckout';

type Props = {
  productList: Product[];
};

export default function CheckoutForm({ productList }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState('');

  const getProductQuantity = useCartStore((cartState) => cartState.getQuantity);
  const clearCart = useCartStore((cartState) => cartState.clear);

  const form = useForm({
    initialValues: {
      fullName: '',
      email: '',
      postCode: '',
      addressLine1: '',
      addressLine2: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    },
    validate: {
      fullName: (value) =>
        value.trim().length >= 2 ? null : '氏名を入力してください',
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value)
          ? null
          : 'メールアドレスの形式が正しくありません',
      postCode: (value) =>
        /^\d{3}-?\d{4}$/.test(value)
          ? null
          : '郵便番号は 123-4567 の形式で入力してください',
      addressLine1: (value) =>
        value.trim().length >= 5 ? null : '住所を入力してください',
      cardNumber: (value) =>
        /^\d{12,19}$/.test(value.replace(/\s/g, ''))
          ? null
          : 'カード番号を入力してください',
      cardExpiry: (value) =>
        /^\d{2}\/\d{2}$/.test(value)
          ? null
          : '有効期限は MM/YY 形式で入力してください',
      cardCvc: (value) =>
        /^\d{3,4}$/.test(value) ? null : 'CVC を入力してください',
    },
  });

  const onSubmit = form.onSubmit(async () => {
    if (submitting) {
      return;
    }

    setSubmitting(true);
    setSubmitErrorMessage('');

    try {
      const { fullName, email, postCode, addressLine1, addressLine2 } =
        form.getValues();

      const orderRequest: OrderRequestParam = {
        itemList: productList.map((product) => ({
          productId: product.id,
          quantity: getProductQuantity(product.id),
          marketPrice: product.price,
        })),
        customer: {
          fullName,
          email,
        },
        shippingAddress: {
          postCode,
          addressLine1,
          addressLine2,
        },
      };

      const createdOrder = await setOrder(orderRequest);
      await setCheckout(createdOrder.id);
      await clearCart();
      router.push(ROUTES.checkoutComplete);
    } catch (error) {
      setSubmitErrorMessage(
        getErrorMessage(
          error,
          '注文の送信に失敗しました。通信状況を確認して、もう一度お試しください。'
        )
      );
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <Stack gap="lg">
          <CheckoutCustomerSection form={form} />

          <Divider />

          <CheckoutPaymentSection form={form} />

          <Alert title="カード情報について" color="yellow">
            このフォームに入力されたカード情報は、決済・保存・送信されません。
            デモ用の入力欄のため、実際のカード情報は使用しないでください。
          </Alert>

          {submitErrorMessage && (
            <Alert title="注文を完了できませんでした" color="red">
              {submitErrorMessage}
            </Alert>
          )}

          <CheckoutFormActions submitting={submitting} />
        </Stack>
      </form>
    </Card>
  );
}
