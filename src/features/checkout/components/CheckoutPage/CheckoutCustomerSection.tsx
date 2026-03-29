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

export default function CheckoutCustomerSection({ form }: Props) {
  return (
    <CheckoutSection
      title="お届け先情報"
      description="注文内容の確認や配送に必要な情報を入力してください。"
    >
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
        placeholder="東京都千代田区..."
        {...form.getInputProps('addressLine1')}
      />
      <TextInput
        label="建物名・部屋番号"
        placeholder="サンプルマンション 101"
        {...form.getInputProps('addressLine2')}
      />
    </CheckoutSection>
  );
}
