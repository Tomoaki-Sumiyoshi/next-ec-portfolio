'use client';

import { Grid, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import {
  formatCardCvc,
  formatCardExpiry,
  formatCardNumber,
} from './checkoutPayment.utils';
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
  const cardNumberProps = form.getInputProps('cardNumber');
  const cardExpiryProps = form.getInputProps('cardExpiry');
  const cardCvcProps = form.getInputProps('cardCvc');

  return (
    <CheckoutSection
      title="お支払い情報"
      description="入力内容は保存・送信されず、実際の決済も行われません。実カード情報は入力しないでください。"
    >
      <TextInput
        label="デモ用カード番号"
        description="実在しない任意の数字を12〜19桁で入力してください"
        placeholder="1111 2222 3333 4444"
        inputMode="numeric"
        required
        maxLength={23}
        {...cardNumberProps}
        onChange={(event) =>
          form.setFieldValue(
            'cardNumber',
            formatCardNumber(event.currentTarget.value)
          )
        }
      />

      <Grid gutter="sm">
        <Grid.Col span={{ base: 12, xs: 6 }}>
          <TextInput
            label="有効期限"
            description="現在以降の月／年を入力してください"
            placeholder="MM/YY"
            inputMode="numeric"
            required
            maxLength={5}
            {...cardExpiryProps}
            onChange={(event) =>
              form.setFieldValue(
                'cardExpiry',
                formatCardExpiry(event.currentTarget.value)
              )
            }
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>
          <TextInput
            label="デモ用CVC"
            description="任意の数字を3〜4桁で入力してください"
            placeholder="123"
            inputMode="numeric"
            required
            maxLength={4}
            {...cardCvcProps}
            onChange={(event) =>
              form.setFieldValue(
                'cardCvc',
                formatCardCvc(event.currentTarget.value)
              )
            }
          />
        </Grid.Col>
      </Grid>
    </CheckoutSection>
  );
}
