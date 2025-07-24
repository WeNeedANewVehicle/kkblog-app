import React, { useCallback } from 'react'
import useUploadFile from '@/features/files/hooks/useUploadFile'
import { FileUploadPath } from '@/common/enum/uploadPath.enum';

/**
 * 파일 업로드 후 업로드된 파일의 경로를 가져오는 훅
 */
function useUploadedFilePath() {
    const { mutateAsync: uploadFile, isPending, isSuccess } = useUploadFile()

    const uploadedFilePath = useCallback(async (file: File | null | undefined) => {
        if (!file) {
            return;
        }

        const form = new FormData()
        form.append('file', file, file!.name)
        form.append('path', FileUploadPath.TEMP)

        const response = await uploadFile(form)
        return response.data;
    }, [uploadFile])

    return {
        uploadedFilePath,
        isPending,
    };
}

export default useUploadedFilePath