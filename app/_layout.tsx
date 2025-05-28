import '~/global.css';

import { Stack, useRouter } from 'expo-router';
import * as React from 'react';
import { TanStackProvider } from '~/providers/tanstack-provider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { ImoveisProvider } from '~/providers/Imoveis-contexts';
import { AuthProvider, useAuth } from '~/providers/auth-context';
import { LoadingSplash } from '../components/ui/loading-splash-screen';
import { Button } from 'react-native';

export {
  ErrorBoundary,
} from 'expo-router';


function RootLayoutNav() {
  const { signOut } = useAuth()
  const router = useRouter()

  const [customSplashActive, setCustomSplashActive] = React.useState(true);

  React.useEffect(() => {
    if (customSplashActive) {
      return;
    }
  }, [customSplashActive])

  if (customSplashActive) {
    return <LoadingSplash onAnimationFinish={() => {
      setCustomSplashActive(false)
    }} />;
  }

  return (
    <Stack
        screenOptions={{
            headerRight: () => <Button onPress={() => {
                signOut()
              }} title="Sair" color="#FF0000" />
            }}
      >
      <Stack.Screen name="(public)" />
      <Stack.Screen name="(private)" />
    </Stack>
  )
}


export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TanStackProvider>
          <AuthProvider>
            <ImoveisProvider>
              <RootLayoutNav />
            </ImoveisProvider>
          </AuthProvider>
        </TanStackProvider>
        <Toast
          autoHide={true}
          visibilityTime={3000}
        />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}


