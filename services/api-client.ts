import { getItemAsync } from 'expo-secure-store'

import ky from 'ky'

const api = ky.create({
    prefixUrl: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    hooks: {
        beforeRequest: [
            async (request) => {
                const token = await getItemAsync('token')

                if(token) {
                    request.headers.set('Authorization', `Bearer ${token}`)
                }
            }
        ]
    }
})

export default api
