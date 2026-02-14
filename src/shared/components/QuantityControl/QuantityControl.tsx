import { Group, Text } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react';

import { useCartStore } from '@/features/cart/store/cart.store';

import styles from './QuantityControl.module.scss';

type Props = {
  productId: string;
};

export default function QuantityControl({ productId }: Props) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const quantity = useCartStore((s) => s.getQuantity(productId));

  return (
    <Group gap="xs" mt="md" w="100%" justify="space-between">
      <ActionIcon
        variant="subtle"
        size="lg"
        aria-label="cart"
        onClick={() => updateQuantity(productId, Math.max(quantity - 1, 0))}
        className={quantity <= 0 ? styles.hidden : ''}
      >
        {quantity <= 1 ? <IconTrash size={20} /> : <IconMinus size={20} />}
      </ActionIcon>

      <Text w={24} ta="center">
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
  );
}
