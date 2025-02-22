import { createCommand, LexicalCommand } from 'lexical'

export const INSERT_IMAGE_COMMAND: LexicalCommand<string> = createCommand(
  'INSERT_IMAGE_COMMAND'
)
