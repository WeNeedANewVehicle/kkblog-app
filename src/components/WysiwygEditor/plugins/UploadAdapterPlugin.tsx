import { baseUrl } from '@/common/constant/constant'
import { uploadFileApi } from '@/features/files/file'
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

    const response = await uploadFileApi(form)

    if (response.error) {
      throw response.error
    }

    return {
      default: response.data,
    }
  }

  abort() {
    // 업로드 취소 기능 (선택 구현)
  }
}

export function UploadAdapterPlugin(editor: Editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) =>
    new UploadAdapter(loader)
}
