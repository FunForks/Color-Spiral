/**
 * ColourContext.jsx
 */


import { createContext, useState } from 'react'

export const ColourContext = createContext()

export const ColourProvider = ({ children }) => {
  const [ colours, setColours ] = useState([])
  
  return (
    <ColourContext.Provider
      value ={{
        colours,
        setColours
      }}
    >
      {children}
    </ColourContext.Provider>
  )
}