/**
 * ColourItems.jsx
 */

import { useContext } from 'react'

import { ColourItem } from "./ColourItem";

import styled from 'styled-components'

import { ColourContext } from '../contexts/ColourContext'



const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`


const StyledItem = styled.li`
  display: flex;
  align-items: center;
  margin: 0.1em 0;

  & > span {
    display: inline-block;
    width: 6em;
  }
`


export const ColourItems = (props) => {
  const { colours, setColours } = useContext(ColourContext)

  const items = colours.map( item => {
    // { name: <string>, index: <integer> colour: <hex> }
    return (
      <StyledItem
        key={item.name}
      >
        <ColourItem 
          item={item}
          colours={colours} // to provide names as tooltips
          setColours={setColours}
        />
      </StyledItem>
    )
  })

  return (
    <StyledList> 
      {items}
    </StyledList>
  )
}