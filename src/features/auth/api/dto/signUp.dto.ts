import { SignInDto, SignInResponseDto } from "@/features/auth/api/dto/signIn.dto";

export interface SignUpDto extends SignInDto {
    nickname: string
    confirm: string
}

export interface SignUpResponseDto extends SignInResponseDto { }
