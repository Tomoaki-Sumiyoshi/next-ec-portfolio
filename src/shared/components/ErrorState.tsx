import { Button, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

type Props = {
  title?: string;
  description: string;
  retryLabel?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title = 'データの取得に失敗しました',
  description,
  retryLabel = '再試行',
  onRetry,
}: Props) {
  return (
    <Stack
      align="center"
      justify="center"
      gap="md"
      py={48}
      bg="white"
      bd="1px solid var(--mantine-color-red-2)"
    >
      <ThemeIcon size={56} radius="xl" variant="light" color="red">
        <IconAlertTriangle size={26} />
      </ThemeIcon>

      <Stack gap={4} align="center">
        <Text fw={700}>{title}</Text>
        <Text size="sm" c="dimmed" ta="center">
          {description}
        </Text>
      </Stack>

      {onRetry && (
        <Button variant="light" color="red" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </Stack>
  );
}
