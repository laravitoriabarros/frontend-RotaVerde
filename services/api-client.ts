import ky from 'ky'

const api = ky.create({
  prefixUrl: process.env.EXPO_BASE_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        console.log(request)
      },
    ],
  },
})

export default api
