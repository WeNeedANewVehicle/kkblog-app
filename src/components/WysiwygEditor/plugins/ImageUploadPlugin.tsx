import { LexicalComposerContextWithEditor } from '@lexical/react/LexicalComposerContext'
import { $getSelection, LexicalEditor } from 'lexical'
import React, { ForwardedRef, forwardRef, LegacyRef } from 'react'
import { INSERT_IMAGE_COMMAND } from '../commands/commands'
import { $createImageNode } from '../nodes/ImageNode'

interface ImageUploadPluginProps {
  editor: LexicalEditor
}

const ImageUploadPlugin = forwardRef<HTMLInputElement, ImageUploadPluginProps>(
  ({ editor }, ref) => {
    return (
      <button className="toolbar-item" aria-label="Insert Image">
        <label>
          <i className="format image" />
          <input
            type="file"
            name=""
            id=""
            hidden
            ref={ref}
            onChange={(e) => {
              const files = e.target.files

              if (!files) {
                return
              }

              const reader = new FileReader()

              reader.onload = (re) => {
                editor.update(() => {
                  const imageNode = $createImageNode(reader.result as string)
                  const selection = $getSelection()
                  selection?.insertNodes([imageNode])
                })
              }
              reader.readAsDataURL(files[0])
              editor.dispatchCommand(INSERT_IMAGE_COMMAND, 'image')
            }}
          />
        </label>
      </button>
    )
  }
)

ImageUploadPlugin.displayName = 'ImageUploadPlugin'

export default ImageUploadPlugin
