import LabeledText from '@/components/Input/LabeledInput/LabeledInput'
import React from 'react'
import Button from '@/components/Button/Button'
import Folder from '@/../public/icons/folder.svg'
import Input from '@/components/Input/Input'

interface FileUploadProps {
  label: string
  className?: string
}

function FileUpload({ label, className }: FileUploadProps) {
  return (
    <LabeledText label={label} className={className}>
      <Input type="file" hidden />
      <ul></ul>
    </LabeledText>
  )
}

export default FileUpload
