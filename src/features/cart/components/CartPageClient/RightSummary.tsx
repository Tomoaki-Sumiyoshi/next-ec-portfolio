import { Paper, Title, Text, Divider, Group, Button } from '@mantine/core';
import Link from 'next/link';

type Props = {
  totalPrice: number;
};

export default function RightSummary({ totalPrice }: Props) {
  return (
    <Paper withBorder p="md" radius="md">
      <Title order={4}>注文</Title>
      <Divider my="sm" />

      <Group justify="space-between">
        <Text size="sm">合計</Text>
        <Text fw={700}>¥{totalPrice.toLocaleString()}</Text>
      </Group>

      <Button fullWidth mt="md" component={Link} href="/checkout">
        レジに進む
      </Button>

      <Button fullWidth mt="xs" variant="default" component={Link} href="/">
        買い物を続ける
      </Button>
    </Paper>
  );
}
