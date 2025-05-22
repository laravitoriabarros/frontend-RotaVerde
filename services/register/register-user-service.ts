import { z } from "zod";
import api from "../api-client";
import { HTTPError } from "ky";
import { userRoleEnum } from "~/lib/types/shared-types";

export const registerUserFormSchema = z.object({
    nome_usuario: z.string({
        required_error: 'Nome é obrigatório.'
    }).min(3, 'Nome é obrigatório.'),
    telefone: z.string({
        required_error: 'Telefone é obrigatório.'
    })
    .min(14, 'Telefone deve ter no mínimo 14 digitos.'),
    email: z.string({
        required_error: 'E-mail é obrigatório.'
    }).email('E-mail inválido.'),
    senha: z.string({
        required_error: 'Senha é obrigatória.'
    }).min(1, { message: 'Senha é obrigatória.'}),
    role: userRoleEnum.optional()
})

export type RegisterUserFormData = z.infer<typeof registerUserFormSchema>

interface IRegisterUserService {
    success: boolean
    message: string | null
    data: null | void
}

export async function registerUserService(data : RegisterUserFormData): Promise<IRegisterUserService> {
    const userData = {
        ...data,
        role: 'cidadao'
    }
    try {
        const result = await api.post('auth/register', {
            json: userData
        }).json<void>()
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
