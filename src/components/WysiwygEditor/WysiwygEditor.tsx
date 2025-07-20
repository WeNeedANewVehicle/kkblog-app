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
          codeBlock: {
            languages: [
              // 퍙문에 대해서는 css 클래스 렌더링하지 않음
              { language: 'plaintext', label: 'Plain text', class: '' },

              // PHP 코드 블록에는  "php-code" 클래스 사용
              { language: 'php', label: 'PHP', class: 'php-code' },

              // 자바스크립트 코드블록에는 "js" 클래스 사용
              // 데이터를 로드할 때 블록의 언어는 첫 번째("js") 클래스에 의해서만 결정됨
              {
                language: 'javascript',
                label: 'JavaScript',
                class: 'js javascript js-code',
              },

              // 파이썬 코드블록은 기본적으로 "language-python" css 클ㄹ래스를 가짐
              { language: 'python', label: 'Python' },
            ],
          },
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
