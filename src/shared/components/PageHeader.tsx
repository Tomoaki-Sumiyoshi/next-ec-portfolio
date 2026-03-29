import { Badge, Box, Divider, Group, Stack, Text, Title } from '@mantine/core';

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
    <Stack gap="md">
      <Group justify="space-between" align="flex-end">
        <Box>
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
        {action}
      </Group>

      <Divider />
    </Stack>
  );
}
