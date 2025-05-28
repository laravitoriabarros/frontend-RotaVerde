import { Stack } from 'expo-router';

export default function CidadaoStack() {
    return (
        <Stack>
            <Stack.Screen name="home" options={{
                title: 'Início Cidadão'
            }}/>
        </Stack>
    );
}
