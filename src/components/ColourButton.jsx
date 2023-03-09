/**
 * ColourButton.jsx
 */

import { useContext } from 'react'

import styled from 'styled-components'

import { ColourContext } from '../contexts/ColourContext'
import { toneColor } from '../tools/colors.js'



const StyledButton = styled.div`
  --size: 10vmin;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: ${props => props.colour};
  border: 10px outset ${props => props.border};
  box-sizing: border-box;
`


export const ColourButton = ({ colour="#900" }) => {
  const border = toneColor(colour, 1.25)

  return (
    <StyledButton
      colour={colour}
      border={border}
    >
      <span />
    </StyledButton>
  )
}