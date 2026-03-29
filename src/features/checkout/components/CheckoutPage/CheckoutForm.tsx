'use client';

import {
  Alert,
  Anchor,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useCartStore } from '@/features/cart/store/cart.store';
import { OrderRequestParam } from '@/features/order/types/order';
import { setOrder } from '@/features/order/usecase/setOrder';
import { Product } from '@/features/products/types/product';
import { ROUTES } from '@/shared/constants/routes';

import { setCheckout } from '../../usecase/setCheckout';

type Props = {
  productList: Product[];
};

export default function CheckoutForm({ productList }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

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

    const { fullName, email, postCode, addressLine1, addressLine2 } =
      form.getValues();

    const requestParam: OrderRequestParam = {
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

    const order = await setOrder(requestParam);
    setCheckout(order.id);
    await clear();
    router.push(ROUTES.checkoutComplete);
  });

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <Stack gap="lg">
          <Stack gap={4}>
            <Text fw={700}>お届け先情報</Text>
            <Text size="sm" c="dimmed">
              注文内容の確認画面に表示される配送先情報です。
            </Text>
          </Stack>

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
            placeholder="東京都渋谷区..."
            {...form.getInputProps('addressLine1')}
          />
          <TextInput
            label="建物名・部屋番号"
            placeholder="サンプルマンション 101"
            {...form.getInputProps('addressLine2')}
          />

          <Divider />

          <Stack gap={4}>
            <Text fw={700}>お支払い情報</Text>
            <Text size="sm" c="dimmed">
              ポートフォリオ用の疑似入力です。実際の決済は行いません。
            </Text>
          </Stack>

          <TextInput
            label="カード番号"
            placeholder="4242 4242 4242 4242"
            inputMode="numeric"
            {...form.getInputProps('cardNumber')}
          />

          <Grid gutter="sm">
            <Grid.Col span={{ base: 12, xs: 6 }}>
              <TextInput
                label="有効期限"
                placeholder="MM/YY"
                {...form.getInputProps('cardExpiry')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 6 }}>
              <TextInput
                label="CVC"
                placeholder="123"
                inputMode="numeric"
                {...form.getInputProps('cardCvc')}
              />
            </Grid.Col>
          </Grid>

          <Alert title="テスト用フォーム" color="brand">
            入力内容は学習用のデモデータとして扱われ、ブラウザ内にのみ保存されます。
          </Alert>

          <Group justify="space-between" align="center" mt="xs" wrap="wrap">
            <Anchor component={Link} href={ROUTES.cart}>
              カートへ戻る
            </Anchor>
            <Button
              type="submit"
              loading={submitting}
              color="brand"
              w={{ base: '100%', xs: 'auto' }}
            >
              注文を確定する
            </Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
}
