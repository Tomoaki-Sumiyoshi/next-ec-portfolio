import { Anchor, Button, Group } from '@mantine/core';
import Link from 'next/link';

import { ROUTES } from '@/shared/constants/routes';

type Props = {
  submitting: boolean;
};

export default function CheckoutFormActions({ submitting }: Props) {
  return (
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
  );
}
