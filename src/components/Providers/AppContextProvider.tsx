import usePreventScroll from '@/common/hooks/usePreventScroll'
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

  usePreventScroll(state.isMenuOpen)

  return (
    <AppContext.Provider value={state}>
      <SetAppContext.Provider value={setState}>
        {children}
      </SetAppContext.Provider>
    </AppContext.Provider>
  )
}
