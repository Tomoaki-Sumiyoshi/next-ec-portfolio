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

export default function CheckoutFrom() {
  const form = useForm({
    initialValues: {
      fullName: '',
      email: '',
      postalCode: '',
      address1: '',
      address2: '',
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
      postalCode: (v) =>
        /^\d{3}-?\d{4}$/.test(v) ? null : '郵便番号（例: 123-4567）',
      address1: (v) => (v.trim().length >= 5 ? null : '住所を入力してください'),
      cardNumber: (v) =>
        /^\d{12,19}$/.test(v.replace(/\s/g, ''))
          ? null
          : 'カード番号（数字のみ）※ダミー',
      cardExpiry: (v) =>
        /^\d{2}\/\d{2}$/.test(v) ? null : '有効期限（MM/YY）※ダミー',
      cardCvc: (v) => (/^\d{3,4}$/.test(v) ? null : 'CVC（3-4桁）※ダミー'),
    },
  });

  return (
    <>
      <Card withBorder radius="md">
        <Alert title="カートが空です" color="red">
          決済を行うには、商品をカートに追加してください。
        </Alert>
        <Stack gap="lg">
          <form>
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
                {...form.getInputProps('postalCode')}
              />
              <TextInput
                label="住所"
                placeholder="東京都○○区…"
                {...form.getInputProps('address1')}
              />
              <TextInput
                label="建物名・部屋番号（任意）"
                placeholder="○○ビル 101"
                {...form.getInputProps('address2')}
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
                <Button type="submit">{} を支払う（ダミー）</Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Card>
    </>
  );
}
