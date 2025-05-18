import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.string({
        required_error: 'E-mail é obrigatório.'
    }).email('E-mail inválido.'),
    password: z.string({
        required_error: 'Senha é obrigatória.'
    }).min(1, { message: 'Senha é obrigatória.'})
})

export type loginFormData = z.infer<typeof loginFormSchema>

export async function signIn(data : loginFormData): Promise<void> {
    console.log(data)
}
