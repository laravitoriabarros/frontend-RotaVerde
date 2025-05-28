import { Stack } from 'expo-router';

export default function MotoristaStack() {
    return (
        <Stack>
            <Stack.Screen name="home" options={{
                title: 'Início Motorista'
            }}/>
        </Stack>
    );
}
