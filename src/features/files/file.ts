import { METHODS } from "@/common/constant/constant";
import api from "@/common/util/api.util";
import { UploadImageFileDto, UploadImageResponseDto } from "@/features/files/dto/upload-image-file.dto";

export async function uploadImageFileApi(params: UploadImageFileDto) {
    return await api<UploadImageFileDto, UploadImageResponseDto>({
        url: '/files/image',
        method: METHODS.POST,
        body: params,
        credentials: 'include',
    })
}