import { AppContextType } from '@/components/Providers/types/AppContext.type'
import React, {
  createContext,
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

const initialAppContext: AppContextType = {
  modal: [],
  isMenuOpen: false,
}

export const AppContext = createContext(initialAppContext)
export const SetAppContext = createContext<Dispatch<
  SetStateAction<AppContextType>
> | null>(null)

export function AppContextProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState(initialAppContext)

  return (
    <AppContext.Provider value={state}>
      <SetAppContext.Provider value={setState}>
        {children}
      </SetAppContext.Provider>
    </AppContext.Provider>
  )
}
