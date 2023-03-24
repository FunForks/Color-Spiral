/**
 * ColourItem.jsx
 */


import { ColourPicker } from "./ColourPicker";



export const ColourItem = (props) => {
  return (
    <>
      <span>{props.item.name}:</span>
      <ColourPicker
        {...props}
      />
    </>
  )
}