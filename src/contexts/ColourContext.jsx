/**
 * ColourContext.jsx
 */


import { createContext, useState } from 'react'

export const ColourContext = createContext()


const getDefault = () => {
  return [
    { name: "Client", index: 1 },
    { name: "Клиент", index: 3 },
    { name: "Cliente", index: 6 }
  ]
}

export const ColourProvider = ({ children }) => {
  const [ colours, setColours ] = useState(getDefault())
  
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