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
  background-color: #000;
  border: 1px solid #333;
  box-sizing: border-box;
`


export const ColourPicker = () => {
  const { width, height } = document.body.getBoundingClientRect()

  let r = Math.min(width, height) / 2 // will reduce progressively
  // <<< HARD-CODED
  const reduce = 0.9505               // by this much

  let l = 0.33       // will reduce progressively
  const fade = 0.98  // by this much

  const s = 1.0
  const ratio = 0.6667
  const arc = 52.5
  const offset = 0 // -0.25
  // HARD-CODED >>>

  const [ cx, cy ] = [ r, r ]

  const shared = {
    cx,
    cy,
    r,
    ratio,
    arc
  }
  

  const chips = Array(64).fill(0).map(( _, number ) => {
    const radius = r
    const start = getGoldenAngleAt(number) - arc / 2
    const bgcolor = getColor({ number, l, s, offset })

    const midradians = Math.PI * (start + arc / 2) / 180
    const midradius = r * (1 + ratio) / 2

    r = r * reduce
    l = l * fade

    return (
      <ColourChip
        key={number}
        { ...shared }
        start={start}
        number={number}
        bgcolor={bgcolor}
        r={radius}
        midradians={midradians}
        midradius={midradius}
      />
    )
  })


  return (
    <StyledDiv>
      {chips}
    </StyledDiv>
  )
}