import { Badge, Box, Divider, Group, Stack, Text, Title } from '@mantine/core';

import styles from './PageHeader.module.scss';

type Props = {
  title: string;
  description?: string;
  badge?: string;
  action?: React.ReactNode;
};

export default function PageHeader({
  title,
  description,
  badge,
  action,
}: Props) {
  return (
    <Stack gap="md" className={styles.root}>
      <Group justify="space-between" align="flex-end" wrap="wrap" className={styles.row}>
        <Box className={styles.heading}>
          <Group gap="sm" mb={description ? 6 : 0}>
            <Title order={2}>{title}</Title>
            {badge && <Badge variant="light">{badge}</Badge>}
          </Group>
          {description && (
            <Text c="dimmed" size="sm">
              {description}
            </Text>
          )}
        </Box>
        {action && <Box className={styles.action}>{action}</Box>}
      </Group>

      <Divider />
    </Stack>
  );
}
