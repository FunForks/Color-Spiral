/**
 * ColourContext.jsx
 */


import { createContext, useState } from 'react'

export const ColourContext = createContext()


const getDefault = () => {
  return [
    { name: "Client", index: 0 },
    { name: "Klient", index: 3 },
    { name: "Cliente", index: 6 },
    { name: "Клиент", index: 1 },
    { name: "عميل", index: 4 },
    { name: "ग्राहक", index: 7 },
    { name: "客户", index: 5 },
    { name: "取り引き先", index: 10 }
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