import { Stack, Text } from '@mantine/core';

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function CheckoutSection({
  title,
  description,
  children,
}: Props) {
  return (
    <Stack gap="md">
      <Stack gap={4}>
        <Text fw={700}>{title}</Text>
        <Text size="sm" c="dimmed">
          {description}
        </Text>
      </Stack>
      {children}
    </Stack>
  );
}
