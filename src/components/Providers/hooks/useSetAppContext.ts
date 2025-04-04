import { messages } from '@/common/messages/messages'
import { SetAppContext } from '@/components/Providers/AppContextProvider'
import { useContext } from 'react'

export function useSetAppContext() {
  const dispatch = useContext(SetAppContext)
  if (!dispatch) {
    throw new Error(messages.context.cannot_find_app_context)
  }
  return dispatch
}
