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
} from 'ckeditor5'
import React from 'react'
import styles from '@/components/WysiwygEditor/WysiwygEditor.module.css'
import { UploadAdapterPlugin } from '@/components/WysiwygEditor/plugins/UploadAdapterPlugin'
import 'ckeditor5/ckeditor5.css'
import './WysiwygEditor.css'

function WysiwygEditor() {
  return (
    <div className={styles.wrapper}>
      <CKEditor

        editor={ClassicEditor}
        config={{
          licenseKey: 'GPL',
          plugins: [
            Essentials,
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
          extraPlugins: [UploadAdapterPlugin]
        }}
        
      />
    </div>
      
  )
}

export default WysiwygEditor
