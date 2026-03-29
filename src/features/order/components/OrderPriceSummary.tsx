import { Divider, Group, Stack, Text } from '@mantine/core';

import { SHIPPING_FEE } from '@/shared/constants/commerce';
import { calculatePriceSummary } from '@/shared/lib/calculatePriceSummary';

type Props = {
  subtotalPrice: number;
};

export default function OrderPriceSummary({ subtotalPrice }: Props) {
  const { consumptionTax, totalPrice } = calculatePriceSummary(subtotalPrice);

  return (
    <Stack gap={6}>
      <Group justify="space-between" wrap="wrap">
        <Text c="dimmed">小計</Text>
        <Text>{subtotalPrice.toLocaleString()}円</Text>
      </Group>
      <Group justify="space-between" wrap="wrap">
        <Text c="dimmed">送料</Text>
        <Text>{SHIPPING_FEE.toLocaleString()}円</Text>
      </Group>
      <Group justify="space-between" wrap="wrap">
        <Text c="dimmed">消費税 (10%)</Text>
        <Text>{consumptionTax.toLocaleString()}円</Text>
      </Group>
      <Divider />
      <Group justify="space-between" wrap="wrap">
        <Text fw={700}>合計</Text>
        <Text fw={700}>{totalPrice.toLocaleString()}円</Text>
      </Group>
    </Stack>
  );
}
