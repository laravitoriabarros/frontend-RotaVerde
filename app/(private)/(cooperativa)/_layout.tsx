import { Stack } from 'expo-router';

export default function CooperativaStack() {
    return (
        <Stack>
            <Stack.Screen name="home" options={{
                title: 'Início Cooperativa'
            }}/>
        </Stack>
    );
}
