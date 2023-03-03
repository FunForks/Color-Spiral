/**
 * ColourPicker.jsx
 */

import styled from 'styled-components'
import { ColourChip } from './ColourChip'


const StyledDiv = styled.div`
  --size: 100vmin;
  position: relative;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: #222
`

export const ColourPicker = () => {
  const { width, height } = document.body.getBoundingClientRect()

  const r = Math.min(width, height) / 2
  const [ rx, ry ] = [ r, r ]
  const ratio = 0.8
  const arc = 60

  const shared = {
    rx,
    ry,
    r,
    ratio,
    arc
  }

  const chips = [ 
    { start: 0, bgColor: "#900"},
    { start: 60, bgColor: "#990"},
    { start: 120, bgColor: "#090"},
    { start: 180, bgColor: "#099"},
    { start: 240, bgColor: "#009"},
    { start: 300, bgColor: "#909"}
  ].map( props => (
      <ColourChip
        key={props.bgColor}
        { ...{ ...props, ...shared } }
      />
    ))

  return (
    <StyledDiv>
      {chips}
    </StyledDiv>
  )
}