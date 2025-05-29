import { useEffect } from 'react';
import { useRouter, Redirect, Stack, useSegments } from 'expo-router';
import { useAuth } from '~/providers/auth-context';

export default function PrivateLayout() {
    const { token, userRole, signOut } = useAuth();
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        if (!token) {
            console.log('NÃO TEM TOKEN')
            router.replace('/initial-decision');
            return;
        }
    }, [token, userRole, router, segments, signOut]);

    if (!token) {
        return <Redirect href="/(public)/initial-decision" />;
    }

    return (
        <Stack>
            <Stack.Screen name="(cidadao)" />
            <Stack.Screen name="(motorista)" />
            <Stack.Screen name="(cooperativa)" />
        </Stack>
    )
}
