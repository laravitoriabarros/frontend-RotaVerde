import '~/global.css';

import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, Text, ViewProps } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { TanStackProvider } from '~/providers/tanstack-provider';
import { ImoveisProvider } from '~/providers/Imoveis-contexts';
import type { FC } from 'react';

let ThemeToggle: FC<ViewProps> | null = null;

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
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) return;

    if (Platform.OS === 'web') {
      document.documentElement.classList.add('bg-background');
    }

    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) return null;

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

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined'
    ? React.useEffect
    : React.useLayoutEffect;