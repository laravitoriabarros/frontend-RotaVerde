import { z } from "zod";

export const loginFormSchema = z.object({
    phone: z.string({
        required_error: 'Telefone é obrigatório.'
    })
    .min(14, 'Telefone deve ter no mínimo 10 dígitos.')
    .nonempty('Telefone é obrigatório.'),
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
