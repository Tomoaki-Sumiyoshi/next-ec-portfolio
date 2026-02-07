import ShopShell from '@/features/shop-shell/components/ShopShell';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ShopShell>{children}</ShopShell>;
}
