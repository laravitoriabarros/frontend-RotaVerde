import { HTTPError } from "ky";
import { z } from "zod";
import { UserRoleEnum } from "~/lib/types/shared-types";
import api from "../api-client";
import { storeAuthData } from "./storage-service";

export const loginFormSchema = z.object({
    email: z.string({
        required_error: 'E-mail é obrigatório.'
    }).email('E-mail inválido.'),
    senha: z.string({
        required_error: 'Senha é obrigatória.'
    }).min(1, { message: 'Senha é obrigatória.'})
})

export type LoginFormData = z.infer<typeof loginFormSchema>

export async function signInService(data : LoginFormData): Promise<any> {
    try {
        const result = await api.post('auth/login', {
            json: data
        }).json<{
            token: string,
            role: UserRoleEnum
        }>()

        if(result) {
            await storeAuthData({
                token: result.token,
                role: result.role
            })
        }

        return { success: true, message: null, data: result }
    } catch (err) {
        console.log(err)
        if(err instanceof HTTPError) {
            const { message } = await err.response.json()
            return { success: false, message, data: null }
        }
        console.error('Erro inesperado.')
        return { success: false, message: null, data: null }
    }
}
