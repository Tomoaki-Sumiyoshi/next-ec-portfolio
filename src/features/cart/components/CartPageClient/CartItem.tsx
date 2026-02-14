import { ActionIcon, Button, Group, Image, Paper, Text } from '@mantine/core';

import QuantityControl from '@/shared/components/QuantityControl/QuantityControl';

import { CartProduct } from '../../types/cart';

type Props = {
  cartProduct: CartProduct;
};

export default function CartItem({ cartProduct }: Props) {
  return (
    <Paper withBorder p="md" radius="md">
      <Group align="center" justify="space-between" wrap="nowrap">
        <Group wrap="nowrap">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            w={72}
            h={72}
            radius="md"
            fit="cover"
          />
          <div>
            <Text fw={600}>{cartProduct.name}</Text>
            <Text size="sm">¥{cartProduct.price.toLocaleString()}</Text>
            <Text size="sm" mt={4}>
              小計: ¥
              {(cartProduct.price * cartProduct.quantity).toLocaleString()}
            </Text>
          </div>
        </Group>

        <Group gap="xs" wrap="nowrap">
          <QuantityControl productId={cartProduct.id} />

          <Button variant="default" ml="sm">
            削除
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}
