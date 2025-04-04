import { METHODS } from '@/common/constant/constant'
import tokenStorage from '@/common/storages/token-storage'
import api from '@/common/util/api.util'
import {
  UploadImageFileDto,
  UploadImageResponseDto,
} from '@/features/files/dto/upload-image-file.dto'

export async function uploadFileApi(params: FormData) {
  const accessToken = tokenStorage.getAccessToken()
  return await api<UploadImageFileDto, UploadImageResponseDto>({
    url: '/files',
    method: METHODS.PUT,
    body: params,
    accessToken,
  })
}
