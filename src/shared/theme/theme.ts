import { createTheme } from '@mantine/core';

export const appTheme = createTheme({
  primaryColor: 'brand',
  defaultRadius: 'lg',
  fontFamily:
    "'Segoe UI', 'Hiragino Sans', 'Yu Gothic UI', sans-serif",
  headings: {
    fontFamily:
      "'Avenir Next', 'Segoe UI', 'Hiragino Sans', 'Yu Gothic UI', sans-serif",
    fontWeight: '700',
  },
  colors: {
    brand: [
      '#eef8ff',
      '#d8edff',
      '#afd9ff',
      '#81c4ff',
      '#5bb2fa',
      '#43a7f3',
      '#2d92dc',
      '#1c73b1',
      '#135786',
      '#0c3b5a',
    ],
  },
  components: {
    AppShell: {
      defaultProps: {
        padding: 'lg',
      },
    },
    Card: {
      defaultProps: {
        withBorder: true,
        radius: 'xl',
        shadow: 'xs',
        padding: 'lg',
      },
    },
    Paper: {
      defaultProps: {
        withBorder: true,
        radius: 'xl',
        shadow: 'xs',
        p: 'lg',
      },
    },
    Alert: {
      defaultProps: {
        radius: 'xl',
        variant: 'light',
      },
    },
    Button: {
      defaultProps: {
        radius: 'xl',
      },
    },
    ActionIcon: {
      defaultProps: {
        radius: 'xl',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
        size: 'md',
      },
    },
    Divider: {
      defaultProps: {
        color: 'gray.3',
      },
    },
  },
});
