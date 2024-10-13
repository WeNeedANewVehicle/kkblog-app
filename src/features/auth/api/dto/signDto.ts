export interface SignInDto {
    email: string;
    password: string;
}

export interface SignInResponseDto {
    accessToken: string;
}

export interface SignUpDto extends SignInDto {
    nickname: string;
}

export interface SignUpResponseDto extends SignInResponseDto { }