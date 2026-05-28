import { IconPackage } from '@tabler/icons-react';

import EmptyState from '@/shared/components/EmptyState';

export default function ProductListEmptyState() {
  return (
    <EmptyState
      title="商品を準備中です"
      description="公開できる商品がまだありません。しばらくしてからもう一度お試しください。"
      icon={<IconPackage size={26} />}
    />
  );
}
