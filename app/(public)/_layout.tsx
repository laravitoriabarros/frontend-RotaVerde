import React from 'react';
import { Href, Stack } from 'expo-router';
import { useAuth } from '~/providers/auth-context';
import { Redirect } from 'expo-router';

export default function AuthLayout() {
    const { token } = useAuth();

    if (token) {
        return <Redirect href={'/(private)' as Href} />;
    }

    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="initial-decision" />
            <Stack.Screen name="register" />
            <Stack.Screen name="signin" />
            <Stack.Screen name="register-user" />
            <Stack.Screen name="register-cooperativa" />
            <Stack.Screen name="register-motorista" />
        </Stack>
    );
}
