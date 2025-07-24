import { useMutation } from '@tanstack/react-query'
import { uploadFileApi } from '@/features/files/api/file'

function useUploadFile() {
  return useMutation({
    mutationFn: (params: FormData) => uploadFileApi(params),
  })
}

export default useUploadFile
