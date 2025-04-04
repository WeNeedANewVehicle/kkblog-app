import LabeledText from '@/components/Input/LabeledInput/LabeledInput'
import React from 'react'
import Button from '@/components/Button/Button'
import Folder from '@/../public/icons/folder.svg'
import Input from '@/components/Input/Input'

interface FileUploadProps {}

function FileUpload({}: FileUploadProps) {
  return (
    <LabeledText label="파일 첨부" className="color-black">
      <Button>
        <Folder />
      </Button>
      <Input type="file" hidden />
      <ul></ul>
    </LabeledText>
  )
}

export default FileUpload
