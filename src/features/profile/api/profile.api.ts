import { METHODS } from "@/common/constant/constant";
import tokenStorage from "@/common/storages/token-storage";
import api from "@/common/util/api.util";
import { GetMyProfileResponseDto } from "@/features/profile/api/dto/getMyProfile.api";
import { UpdateMyProfileDto, UpdateMyProfileResponseDto } from "@/features/profile/api/dto/updateMyProfile.api";

export async function getMyProfileApi() {
    const accessToken = tokenStorage.getAccessToken()
    const response = await api<undefined, GetMyProfileResponseDto>({
        url: '/users/profile/me',
        accessToken,
    });

    return response;
}

export async function updateMyProfileApi(params: UpdateMyProfileDto) {
    const accessToken = tokenStorage.getAccessToken();
    const response = await api<UpdateMyProfileDto, UpdateMyProfileResponseDto>({
        url: '/users/profile/me',
        body: params,
        accessToken,
        method: METHODS.PATCH
    });

    return response;
}