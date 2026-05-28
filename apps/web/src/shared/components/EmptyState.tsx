import { Stack, Text, ThemeIcon } from '@mantine/core';

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
};

export default function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: Props) {
  return (
    <Stack
      align="center"
      justify="center"
      gap="md"
      py={48}
      bg="white"
      bd="1px solid var(--mantine-color-gray-2)"
      className={className}
    >
      <ThemeIcon size={56} radius="xl" variant="light" color="brand">
        {icon}
      </ThemeIcon>

      <Stack gap={4} align="center">
        <Text fw={700}>{title}</Text>
        <Text size="sm" c="dimmed" ta="center">
          {description}
        </Text>
      </Stack>

      {action}
    </Stack>
  );
}
