'use client';

import {
  Card,
  Stack,
  Title,
  Group,
  Box,
  Divider,
  Text,
  Image,
} from '@mantine/core';

import { Product } from '@/features/products/types/product';

type Props = {
  productList: Product[];
};

export default function RightSummary({ productList }: Props) {
  return (
    <Card withBorder radius="md">
      <Stack gap="md">
        <Title order={4}>注文サマリ</Title>
        <Stack gap="sm">
          {productList.map((product) => (
            <Card key={product.id} withBorder radius="md" padding="sm">
              <Group align="flex-start" wrap="nowrap">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  w={72}
                  h={72}
                  radius="sm"
                  fit="cover"
                />
                <Box>
                  <Group justify="space-between" align="flex-start">
                    <Box>
                      <Text fw={600} lineClamp={1}>
                        {product.name}
                      </Text>
                      <Text size="sm" c="dimmed" mt={4}>
                        数量: {'3'}
                      </Text>
                    </Box>
                    <Text fw={600}>{'3000'}</Text>
                  </Group>
                </Box>
              </Group>
            </Card>
          ))}
        </Stack>

        <Divider />

        <Stack gap={6}>
          <Group justify="space-between">
            <Text c="dimmed">小計</Text>
            <Text>{}</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">送料</Text>
            <Text>{}</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">消費税（目安）</Text>
            <Text>{}</Text>
          </Group>
          <Divider />
          <Group justify="space-between">
            <Text fw={700}>合計</Text>
            <Text fw={700}>{}</Text>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
}
