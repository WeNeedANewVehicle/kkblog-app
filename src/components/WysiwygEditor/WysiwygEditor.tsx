import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  LinkImage,
  Underline,
  Strikethrough,
  Code,
  CodeBlock,
  Superscript,
  Subscript,
  EventInfo,
  Font,
} from 'ckeditor5'
import React from 'react'
import { UploadAdapterPlugin } from '@/components/WysiwygEditor/plugins/UploadAdapterPlugin'
import 'ckeditor5/ckeditor5.css'
import './WysiwygEditor.css'

export interface WysiwygEditorProps {
  onChange: (event: EventInfo, editor: ClassicEditor) => void
  onReady?: (editor: ClassicEditor) => void
  data?: string
}

function WysiwygEditor({ onChange, onReady, data }: WysiwygEditorProps) {
  return (
    <div className="flex flex-col flex-1 border-2 border-black max-h-screen">
      <CKEditor
        onChange={onChange}
        onReady={onReady}
        data={data}
        editor={ClassicEditor}
        config={{
          licenseKey: 'GPL',
          plugins: [
            Essentials,
            Font,
            Paragraph,
            Bold,
            Italic,
            Underline,
            Strikethrough,
            Code,
            CodeBlock,
            Superscript,
            Subscript,
            Image,
            ImageCaption,
            ImageResize,
            ImageStyle,
            ImageToolbar,
            LinkImage,
            ImageUpload,
          ],
          toolbar: [
            'undo',
            'redo',
            '|',
            'fontSize',
            'fontColor',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'code',
            'codeBlock',
            'subscript',
            'superscript',
            '|',
            'insertImage',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            '|',
            'toggleImageCaption',
            'imageTextAlternative',
          ],
          extraPlugins: [UploadAdapterPlugin],
        }}
      />
    </div>
  )
}

export default WysiwygEditor
