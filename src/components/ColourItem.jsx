/**
 * ColourItem.jsx
 */


import { ColourPicker } from "./ColourPicker";



export const ColourItem = (props) => {
  return (
    <>
      <span>{props.name}:</span>
      <ColourPicker
        {...props}
      />
    </>
  )
}