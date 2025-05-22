import '~/global.css';

import { PortalHost } from '@gorhom/portal';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import type { FC } from 'react';
import * as React from 'react';
import { Text, useColorScheme } from 'react-native';
import { ImoveisProvider } from '~/providers/Imoveis-contexts';
import { TanStackProvider } from '~/providers/tanstack-provider';

// Define the navigation theme colors
const NAV_THEME = {
  light: {
    primary: '#000000',
    background: '#ffffff',
    card: '#ffffff',
    text: '#000000',
    border: '#000000',
    notification: '#ff3b30',
  },
  dark: {
    primary: '#ffffff',
    background: '#000000',
    card: '#000000',
    text: '#ffffff',
    border: '#ffffff',
    notification: '#ff453a',
  },
};

let ThemeToggle: FC<{ style?: any }> | null = null;

try {
  ThemeToggle = require('~/components/ThemeToggle').default;
} catch (e) {
  console.warn('ThemeToggle não pôde ser carregado:', e);
  ThemeToggle = null;
}

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};

const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  ErrorBoundary
} from 'expo-router';

export default function RootLayout() {
  const isDarkColorScheme = useColorScheme() === 'dark';

  return (
    <>
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
     <TanStackProvider>
      <ImoveisProvider>
        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: 'Starter Base',
              // ✅ Evita crash no header se ThemeToggle falhar
              headerRight: () =>
                ThemeToggle ? <ThemeToggle /> : <Text style={{ marginRight: 10 }}>⚙️</Text>,
            }}
          />
        </Stack>
      </ImoveisProvider>
    </TanStackProvider>
   </ThemeProvider>
  <PortalHost />
  </>
  );
}
