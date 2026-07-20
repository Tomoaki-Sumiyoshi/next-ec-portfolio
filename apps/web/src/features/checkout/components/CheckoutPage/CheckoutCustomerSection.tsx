'use client';

import { TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import CheckoutSection from './CheckoutSection';

type CheckoutFormValues = {
  fullName: string;
  email: string;
  postCode: string;
  addressLine1: string;
  addressLine2: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
};

type Props = {
  form: UseFormReturnType<CheckoutFormValues>;
};

function formatPostCode(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 7);
  return digits.length > 3
    ? `${digits.slice(0, 3)}-${digits.slice(3)}`
    : digits;
}

export default function CheckoutCustomerSection({ form }: Props) {
  const postCodeProps = form.getInputProps('postCode');

  return (
    <CheckoutSection
      title="お届け先情報"
      description="注文内容の確認や配送に必要な情報を入力してください。"
    >
      <TextInput
        label="氏名"
        placeholder="山田 太郎"
        autoComplete="name"
        required
        maxLength={100}
        {...form.getInputProps('fullName')}
      />
      <TextInput
        label="メールアドレス"
        placeholder="taro@example.com"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        maxLength={254}
        {...form.getInputProps('email')}
      />
      <TextInput
        label="郵便番号"
        description="数字7桁で入力するとハイフンを自動で追加します"
        placeholder="123-4567"
        inputMode="numeric"
        autoComplete="postal-code"
        required
        maxLength={8}
        {...postCodeProps}
        onChange={(event) =>
          form.setFieldValue('postCode', formatPostCode(event.currentTarget.value))
        }
      />
      <TextInput
        label="住所"
        description="都道府県から入力してください"
        placeholder="東京都千代田区千代田1-1"
        autoComplete="address-line1"
        required
        maxLength={200}
        {...form.getInputProps('addressLine1')}
      />
      <TextInput
        label="建物名・部屋番号"
        description="任意"
        placeholder="サンプルマンション 101号室"
        autoComplete="address-line2"
        maxLength={200}
        {...form.getInputProps('addressLine2')}
      />
    </CheckoutSection>
  );
}
