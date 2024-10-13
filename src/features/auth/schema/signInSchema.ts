import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
    password: z.string().min(8, { message: "비밀번호는 최소 8자 이상입니다." }).max(20, { message: "비밀번호는 최대 20자입니다." }),
})

export type SignInSchema = z.infer<typeof signInSchema>;