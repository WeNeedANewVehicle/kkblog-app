import { baseUrl } from "@/common/constant/constant";
import { uploadImageFileApi } from "@/features/files/file";
import { Editor, FileLoader } from "ckeditor5";

class UploadAdapter {
    loader: FileLoader;
    uploadUrl: string;

    constructor(loader: FileLoader) {
        this.loader = loader;
        this.uploadUrl = `${baseUrl}/files/image`
    }

    async upload() {
        const file = await this.loader.file;
        
        if (!file) {
            return '';
        }

        const data = new FormData();
        data.append('file', file);

        console.log(data, file)
        const response = await uploadImageFileApi(file)

        return new Promise(() => {
            if (response.error) {
                throw response.error
            }

            return response.data;
        })
        .then(res => ({ default: res }))
        .catch(err => err);
      }
  
      abort() {
        // 업로드 취소 기능 (선택 구현)
      }
}

export function UploadAdapterPlugin(editor: Editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => new UploadAdapter(loader)

}