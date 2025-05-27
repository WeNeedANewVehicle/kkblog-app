import { baseUrl } from '@/common/constant/constant'
import { ErrorBaseResponse } from '@/common/dto/baseResponse'
import { FileUploadPath } from '@/common/enum/uploadPath.enum'
import { isTokenExpiredError } from '@/common/util/isTokenExpired.util'
import { uploadFileApi } from '@/features/files/api/file'
import { Editor, FileLoader } from 'ckeditor5'

class UploadAdapter {
  loader: FileLoader
  uploadUrl: string

  constructor(loader: FileLoader) {
    this.loader = loader
    this.uploadUrl = `${baseUrl}/files`
  }

  async upload() {
    const file = await this.loader.file

    if (!file) {
      return Promise.reject(new Error('File Not Found'))
    }

    const form = new FormData()
    form.append('file', file, file.name)
    form.append('path', FileUploadPath.TEMP)

    const result = await this.exponentialFileUpload(form)

    return result
  }

  abort() {
    // 업로드 취소 기능 (선택 구현)
  }

  async exponentialFileUpload(
    form: FormData,
    retryCount = 0
  ): Promise<{ default: string }> {
    if (retryCount === 5) {
      throw alert('이미지 업로드에 실패했습니다.')
    }

    try {
      const response = await uploadFileApi(form)
      return { default: response.data }
    } catch (e) {
      const err = e as unknown as ErrorBaseResponse

      const isTokenExpired = isTokenExpiredError(err)
      if (!isTokenExpired) {
        throw err
      }
      const result = await this.exponentialFileUpload(form, retryCount + 1)
      return result
    }
  }
}

export function UploadAdapterPlugin(editor: Editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) =>
    new UploadAdapter(loader)
}
