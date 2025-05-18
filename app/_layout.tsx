import '~/global.css';

import { Stack } from 'expo-router';
import * as React from 'react';
import { TanStackProvider } from '~/providers/tanstack-provider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <TanStackProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                title: 'Rota Verde',
              }}
            />
          </Stack>
        </TanStackProvider>
        <Toast
          autoHide={true}
          visibilityTime={3000}
        />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
