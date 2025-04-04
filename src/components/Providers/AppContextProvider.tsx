import { AppContextType } from '@/components/Providers/types/AppContext.type';
import { messages } from '@/common/messages/messages';
import React, { createContext, PropsWithChildren, useContext, useState, Dispatch, SetStateAction } from 'react'

const initialAppContext: AppContextType = {
  modal: [],
}

export const AppContext = createContext(initialAppContext)
export const SetAppContext = createContext<Dispatch<SetStateAction<AppContextType>> | null>(null);

export function AppContextProvider({children}: PropsWithChildren) {
  const [state, setState] = useState(initialAppContext)
  return (
    <AppContext.Provider value={state}>
      <SetAppContext.Provider value={setState}>
        {children}
      </SetAppContext.Provider>
    </AppContext.Provider>
  )
}
