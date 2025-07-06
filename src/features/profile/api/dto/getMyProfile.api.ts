import { Profile } from "@/features/profile/type/profile.type";

export interface GetMyProfileResponseDto extends Pick<Profile, 'bio' | 'image' | 'summary' | 'updatedAt' | 'user'> { }