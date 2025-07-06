import tokenStorage from "@/common/storages/token-storage";
import api from "@/common/util/api.util";
import { GetMyProfileResponseDto } from "@/features/profile/api/dto/getMyProfile.api";

export async function getMyProfileApi() {
    const accessToken = tokenStorage.getAccessToken()
    const response = await api<undefined, GetMyProfileResponseDto>({
        url: '/users/profile/me',
        accessToken,
    })

    return response;
}