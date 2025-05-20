import { AppContextType } from '@/components/Providers/types/AppContext.type'
import React, {
  createContext,
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'

const initialAppContext: AppContextType = {
  modal: [],
  isMenuOpen: false,
  user: null,
}

export const AppContext = createContext(initialAppContext)
export const SetAppContext = createContext<Dispatch<
  SetStateAction<AppContextType>
> | null>(null)

export function AppContextProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState(initialAppContext)

  useEffect(() => {
    if (state.isMenuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [state.isMenuOpen])

  return (
    <AppContext.Provider value={state}>
      <SetAppContext.Provider value={setState}>
        {children}
      </SetAppContext.Provider>
    </AppContext.Provider>
  )
}
