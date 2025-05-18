import { z } from "zod";
import api from "../api-client";
import { HTTPError } from "ky";
import { userRoleEnum } from "~/lib/types/shared-types";

export const registerMotoristaFormSchema = z.object({
    nome_usuario: z.string({
        required_error: 'Nome é obrigatório.'
    }).min(3, 'Nome é obrigatório.'),
    email: z.string({
        required_error: 'E-mail é obrigatório.'
    }).email('E-mail inválido.'),
    telefone: z.string({
        required_error: 'Telefone é obrigatório.'
    })
    .min(14, 'Telefone deve ter no mínimo 14 digitos.'),
    nome_cooperativa: z.string({
        required_error: 'Cooperativa é obrigatória.'
    }).min(1, {
        message: 'Cooperativa é obrigatória.'
    }),
    senha: z.string({
        required_error: 'Senha é obrigatória.'
    }).min(1, { message: 'Senha é obrigatória.'}),
    confirmar_senha: z.string().nonempty('Confirmação de senha não pode ser vazia').min(1, {
        message: 'A confirmação de senha é obrigatória.'
    }),
    role: userRoleEnum.optional()
}).refine(
    ({ senha, confirmar_senha }) => senha === confirmar_senha,
    {
      message: 'As senhas não são iguais',
      path: ['confirmar_senha'],
    },
  )

export const registerMotoristaServiceSchema = z.object({
    nome_usuario: z.string(),
    senha: z.string(),
    email: z.string(),
    telefone: z.string(),
    nome_cooperativa: z.string(),
})


export type RegisterMotoristaServiceData = z.infer<typeof registerMotoristaServiceSchema>

export type RegisterMotoristaFormData = z.infer<typeof registerMotoristaFormSchema>

interface IRegisterMotoristaService {
    success: boolean
    message: string | null
    data: null | void
}

export async function registerMotoristaService(data : RegisterMotoristaServiceData): Promise<IRegisterMotoristaService> {
    const userData = {
        ...data,
        role: 'motorista'
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
