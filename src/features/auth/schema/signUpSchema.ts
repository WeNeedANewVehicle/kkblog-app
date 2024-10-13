import { messages } from "@/common/messages/messages";
import { z } from "zod";
import { signInSchema } from "./signInSchema";
import { hasSpecialChar } from "@/common/util/validation";

const { validation } = messages;
const { password, nickname } = validation;

export const signUpSchema = signInSchema.extend({
    confirm: z.string(),
    nickname: z.string().min(3, { message: nickname.min_length }).max(16, { message: nickname.max_length }).refine(data => {
        return !hasSpecialChar(data)
    }),
}).refine((data) => data.password === data.confirm, {
    message: password.not_match,
    path: ["confirm"],
})
export type SignUpSchema = z.infer<typeof signUpSchema>;