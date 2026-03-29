import {
  ActionIcon,
  Box,
  Card,
  Group,
  Image,
  Stack,
  Text,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

import { Product } from '@/features/products/types/product';
import QuantityControl from '@/shared/components/QuantityControl/QuantityControl';

import styles from './CartItemCard.module.scss';
import { useCartStore } from '../../store/cart.store';

type Props = {
  product: Product;
};

export default function CartItemCard({ product }: Props) {
  const quantity = useCartStore((s) => s.getQuantity(product.id));
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <Group align="center" justify="space-between" wrap="nowrap">
      <Card withBorder radius="md" p="md" w="100%">
        <Stack gap="sm">
          <Group align="center" justify="space-between" wrap="nowrap">
            <Group align="center" gap="md" wrap="nowrap" miw={0}>
              <Box className={styles.imageBox}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  radius="md"
                  w={72}
                  h={72}
                  fit="cover"
                />
              </Box>

              <Box miw={0}>
                <Text fw={600} lineClamp={2}>
                  {product.name}
                </Text>
                <Text c="dimmed" size="sm">
                  ¥{product.price.toLocaleString()}
                </Text>
                <Text size="sm">
                  小計: ¥{(product.price * quantity).toLocaleString()}
                </Text>
              </Box>
            </Group>
            <ActionIcon
              variant="subtle"
              size="lg"
              aria-label="cart"
              onClick={() => removeItem(product.id)}
              w="auto"
            >
              <IconTrash size={20} />
            </ActionIcon>
          </Group>
          <QuantityControl productId={product.id} />
        </Stack>
      </Card>
    </Group>
  );
}
