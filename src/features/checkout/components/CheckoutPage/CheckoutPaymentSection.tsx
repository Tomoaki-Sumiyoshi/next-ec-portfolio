'use client';

import { Grid, TextInput } from '@mantine/core';
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

export default function CheckoutPaymentSection({ form }: Props) {
  return (
    <CheckoutSection
      title="お支払い情報"
      description="ポートフォリオ用の入力欄です。実際の決済は行われません。"
    >
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
    </CheckoutSection>
  );
}
