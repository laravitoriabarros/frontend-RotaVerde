import { z } from "zod";

export const userRoleEnum = z.enum(['cidadao', 'cooperativa', 'motorista'])

export type UserRoleEnum = z.infer<typeof userRoleEnum>
