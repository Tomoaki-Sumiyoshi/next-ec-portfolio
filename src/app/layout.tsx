import '@mantine/core/styles.css';

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from '@mantine/core';

import { appTheme } from '@/shared/theme/theme';

export const metadata = {
  title: 'My EC Portfolio',
  description: 'EC site portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={appTheme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
