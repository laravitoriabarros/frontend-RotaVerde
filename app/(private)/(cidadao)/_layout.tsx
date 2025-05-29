import { Stack } from 'expo-router';

export default function CidadaoStack() {
    return (
        <Stack>
            <Stack.Screen name="home" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="tutorials" />
            <Stack.Screen name="map" />
        </Stack>
    );
}
