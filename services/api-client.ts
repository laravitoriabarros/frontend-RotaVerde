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
            }
        ]
    }
})

export default api
