import { Box, Group, Text } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react';

import { useCartStore } from '@/features/cart/store/cart.store';

import styles from './QuantityControl.module.scss';

type Props = {
  productId: string;
};

export default function QuantityControl({ productId }: Props) {
  const updateQuantity = useCartStore((cartState) => cartState.updateQuantity);
  const quantity = useCartStore((cartState) =>
    cartState.getQuantity(productId)
  );

  return (
    <Box bd="1px solid var(--mantine-color-gray-3)" bdrs="sm" w="100%">
      <Group gap="xs" w="100%" justify="space-between" wrap="nowrap">
        <ActionIcon
          variant="subtle"
          size="lg"
          aria-label="cart"
          onClick={() => updateQuantity(productId, Math.max(quantity - 1, 0))}
          className={quantity <= 0 ? styles.hidden : ''}
        >
          {quantity <= 1 ? <IconTrash size={20} /> : <IconMinus size={20} />}
        </ActionIcon>

        <Text w="sm" ta="center">
          {quantity}
        </Text>

        <ActionIcon
          variant="subtle"
          size="lg"
          aria-label="cart"
          onClick={() => updateQuantity(productId, Math.min(quantity + 1, 10))}
          className={quantity >= 10 ? styles.hidden : ''}
        >
          <IconPlus size={20} />
        </ActionIcon>
      </Group>
    </Box>
  );
}
