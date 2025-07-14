import { MeResponseDto } from "@/features/auth/api/dto/signIn.dto";
import { Profile } from "@/features/profile/type/profile.type";

export interface UpdateMyProfileDto extends Pick<Profile, 'bio' | 'image' | 'summary'> {
    nickname: string;
}

export interface UpdateMyProfileResponseDto extends Pick<Profile, 'bio' | 'image' | 'summary'> {
    user: Pick<MeResponseDto, 'email' | 'nickname'>
}