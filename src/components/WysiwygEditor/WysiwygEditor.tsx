'use client'

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import ToolbarPlugin from './plugins/ToolbarPlugin'
import WysiwysEditorTheme from './WysiwysEditorTheme'
import AutoFocusPlugin from './plugins/AutoFocusPlugin'
import { ImageNode } from './nodes/ImageNode'

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error)
}

function WysiwygEditor() {
  const initialConfig = {
    namespace: 'Editor',
    theme: WysiwysEditorTheme,
    nodes: [ImageNode],
    onError,
  }

  return (
    <div className={'editor'}>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <div className="editor-container">
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable style={{ outline: 'none', padding: '1rem' }} />
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
          </div>
        </div>
      </LexicalComposer>
    </div>
  )
}

export default WysiwygEditor
