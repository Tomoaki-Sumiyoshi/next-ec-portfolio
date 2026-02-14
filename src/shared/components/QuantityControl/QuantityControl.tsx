import { Group, Text } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

import styles from './QuantityControl.module.scss';

export default function QuantityControl() {
  const [count, setCount] = useState(1);

  return (
    <Group gap="xs" w="100%" justify="space-between">
      <ActionIcon
        variant="subtle"
        size="lg"
        aria-label="cart"
        onClick={() => setCount((c) => Math.max(1, c - 1))}
        className={count <= 0 ? styles.hidden : ''}
      >
        {count <= 1 ? <IconTrash size={20} /> : <IconMinus size={20} />}
      </ActionIcon>

      <Text w={24} ta="center">
        {count}
      </Text>

      <ActionIcon
        variant="subtle"
        size="lg"
        aria-label="cart"
        onClick={() => setCount((c) => c + 1)}
        className={count >= 10 ? styles.hidden : ''}
      >
        <IconPlus size={20} />
      </ActionIcon>
    </Group>
  );
}
