import { METHODS } from '@/common/constant/constant'
import tokenStorage from '@/common/storages/token-storage'
import api from '@/common/util/api.util'

export async function uploadFileApi(params: FormData) {
  const accessToken = tokenStorage.getAccessToken()
  return await api<FormData, string>({
    url: '/files',
    method: METHODS.PUT,
    body: params,
    accessToken,
  })
}
