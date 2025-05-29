import { z } from "zod";

export const enderecoSchema = z.object({
    "cidade": z.string().min(1, {
        message: 'Cidade é obrigatória.',
    }),
    "logradouro": z.string().min(1, {
        message: 'Logradouro é obrigatório',
    }),
    "bairro": z.string().min(1, {
        message: 'Bairro é obrigatório.',
    }),
    "numero": z.string().min(1, {
        message: 'Número é obrigatório',
    }),
})
