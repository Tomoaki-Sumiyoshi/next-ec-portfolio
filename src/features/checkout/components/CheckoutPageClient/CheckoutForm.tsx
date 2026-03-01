'use client';

import {
  Card,
  Alert,
  Stack,
  Title,
  TextInput,
  Divider,
  Group,
  Anchor,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 } from 'uuid';

import { useCartStore } from '@/features/cart/store/cart.store';
import { Order } from '@/features/order/types/order';
import { Product } from '@/features/products/types/product';

import { setCheckout } from '../../usecase/setCheckout';

type Props = {
  productList: Product[];
};

export default function CheckoutFrom({ productList }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const getQuantity = useCartStore((s) => s.getQuantity);
  const clear = useCartStore((s) => s.clear);

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
      fullName: (v) =>
        v.trim().length >= 2 ? null : 'お名前を入力してください',
      email: (v) =>
        /^\S+@\S+\.\S+$/.test(v)
          ? null
          : 'メールアドレスの形式が正しくありません',
      postCode: (v) =>
        /^\d{3}-?\d{4}$/.test(v) ? null : '郵便番号（例: 123-4567）',
      addressLine1: (v) =>
        v.trim().length >= 5 ? null : '住所を入力してください',
      cardNumber: (v) =>
        /^\d{12,19}$/.test(v.replace(/\s/g, ''))
          ? null
          : 'カード番号（数字のみ）※ダミー',
      cardExpiry: (v) =>
        /^\d{2}\/\d{2}$/.test(v) ? null : '有効期限（MM/YY）※ダミー',
      cardCvc: (v) => (/^\d{3,4}$/.test(v) ? null : 'CVC（3-4桁）※ダミー'),
    },
  });

  const onSubmit = form.onSubmit(() => {
    if (submitting) return;

    setSubmitting(true);

    const { fullName, email, postCode, addressLine1, addressLine2 } =
      form.getValues();

    const snapshot: Order = {
      id: v4(),
      createdAt: new Date().toISOString(),
      itemList: productList.map((product) => ({
        productId: product.id,
        quantity: getQuantity(product.id),
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

    // 外部送信なし（架空決済）
    setCheckout(snapshot);
    clear();
    router.push('/checkout/complete');
  });

  return (
    <>
      <Card withBorder radius="md">
        <Stack gap="lg">
          <form onSubmit={onSubmit}>
            <Stack gap="md">
              <Title order={4}>配送先・連絡先</Title>
              <TextInput
                label="氏名"
                placeholder="山田 太郎"
                {...form.getInputProps('fullName')}
              />
              <TextInput
                label="メールアドレス"
                placeholder="taro@example.com"
                {...form.getInputProps('email')}
              />
              <TextInput
                label="郵便番号"
                placeholder="123-4567"
                {...form.getInputProps('postCode')}
              />
              <TextInput
                label="住所"
                placeholder="東京都○○区…"
                {...form.getInputProps('addressLine1')}
              />
              <TextInput
                label="建物名・部屋番号（任意）"
                placeholder="○○ビル 101"
                {...form.getInputProps('addressLine2')}
              />

              <Divider />

              <Title order={4}>カード情報（ダミー）</Title>
              <TextInput
                label="カード番号"
                placeholder="4242 4242 4242 4242"
                inputMode="numeric"
                {...form.getInputProps('cardNumber')}
              />
              <Group grow>
                <TextInput
                  label="有効期限"
                  placeholder="MM/YY"
                  {...form.getInputProps('cardExpiry')}
                />
                <TextInput
                  label="CVC"
                  placeholder="123"
                  inputMode="numeric"
                  {...form.getInputProps('cardCvc')}
                />
              </Group>

              <Alert title="注意" color="gray">
                このページはデモです。入力情報はサーバーへ送信しません。
              </Alert>

              <Group justify="space-between" align="center" mt="sm">
                <Anchor href="/cart">カートに戻る</Anchor>
                <Button type="submit" loading={submitting}>
                  支払う（ダミー）
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Card>
    </>
  );
}
