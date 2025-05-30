import { useEffect } from 'react';
import { useRouter, Redirect, Stack, useSegments } from 'expo-router';
import { useAuth } from '~/providers/auth-context';

export default function PrivateLayout() {
    const { token, userRole, signOut } = useAuth();
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        if (!token) {
            console.log({
                message: 'Não tem Token - Private Layout'
            })
            return router.replace('/initial-decision')
        }
    }, [token, userRole, router, signOut]);

    return (
        <Stack>
            <Stack.Screen name="(cidadao)" />
            <Stack.Screen name="(motorista)" />
            <Stack.Screen name="(cooperativa)" />
        </Stack>
    )
}
