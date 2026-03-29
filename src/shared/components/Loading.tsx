'use client';

import { Center, Loader } from '@mantine/core';

export default function Loading() {
  return (
    <Center py="xl">
      <Loader color="brand" />
    </Center>
  );
}
