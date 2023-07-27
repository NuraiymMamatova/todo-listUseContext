import { createContext } from 'react'

export const DispatchContext = createContext();

export const DispatchProvider = ({value, children}) => {
  return (
    <DispatchContext.Provider value={value}>{children}</DispatchContext.Provider>
  )
}
