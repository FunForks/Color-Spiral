/**
 * ColourPicker.jsx
 */

import styled from 'styled-components'
import { ColourChip } from './ColourChip'
import {
  getGoldenAngleAt,
  getColor
} from '../tools/colors'


const StyledDiv = styled.div`
  --size: 100vmin;
  position: relative;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: #000
`


export const ColourPicker = () => {
  const { width, height } = document.body.getBoundingClientRect()

  let r = Math.min(width, height) / 2
  let l = 0.4
  const [ cx, cy ] = [ r, r ]
  const ratio = 0.863
  const arc = 52.3
  const reduce = 0.97
  const offset = -0.25

  const shared = {
    cx,
    cy,
    r,
    ratio,
    arc
  }
  

  const chips = Array(128).fill(0).map(( _, number ) => {
    r = r * reduce
    l = l * reduce
    const start = getGoldenAngleAt(number)
    const bgColor = getColor({ number, l, offset })

    return (
      <ColourChip
        key={number}
        { ...shared }
        start={start}
        bgColor={bgColor}
        r={r}
      />
    )
  })


  return (
    <StyledDiv>
      {chips}
    </StyledDiv>
  )
}