/**
 * ColourChip.jsx
 */

import { useContext } from 'react'

import styled from 'styled-components'

import { ColourContext } from '../contexts/ColourContext'


// Functions for generating CSS

const getPath = ({ cx, cy, r, ratio, start, arc }) => {
  const innerRadius = r * ratio
  const startRad = Math.PI * start / 180
  const endAngle = start + arc
  const endRad = Math.PI * (endAngle) / 180

  // Calculate from start
  const startX = cx + ( r *  Math.sin(startRad) )
  const startY = cy - ( r *  Math.cos(startRad) )

  // Calculate from start + arc
  const outerX = cx + ( r * Math.sin(endRad) )
  const outerY = cy - ( r * Math.cos(endRad) )

  // Calculate from start + arc and ratio
  const innerX = cx + innerRadius * Math.sin(endRad)
  const innerY = cy - innerRadius * Math.cos(endRad)
  // Calculate from start and ratio
  const endX = cx + innerRadius * Math.sin(startRad)
  const endY = cy - innerRadius * Math.cos(startRad)

  return `path('
    M ${startX} ${startY}
    A ${r} ${r} ${arc} 0 1 ${outerX} ${outerY}
    L ${innerX} ${innerY}
    A ${innerRadius} ${innerRadius} ${arc} 0 0 ${endX} ${endY}
    z
  ')`
}


const getAfterPath = ({
  cx,
  cy,
  hr:     r,
  hratio: ratio,
  hstart: start,
  harc:   arc
}) => {

  return getPath({ cx, cy, r, ratio, start, arc })
}


const getSpanCSS = ({ cx, cy, midradius, midradians }) => {
  const left = cx + ( midradius *  Math.sin(midradians) )
  const top = cy - ( midradius *  Math.cos(midradians) )
  let size = midradius / 5
  if (size < 7) {
    size = 0
  }

  return `
  position: absolute;
  top: ${top}px;
  left: ${left}px;
  font-size: ${size}px;
  transform: translate(-50%, -50%);
  `
}


const StyledChip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  clip-path: ${props => getPath(props)};
  background-color: ${props => props.bgcolor};
  cursor: pointer;

  &.taken::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    clip-path: ${props => getAfterPath(props)};
    background-color: #0009;
  }

  & span {
    ${props => getSpanCSS(props)};
  }

  &.taken span {
    color: #000;
  }
`


// Component

export const ColourChip = (props) => {
  const { colours, setColours } = useContext(ColourContext)
  const { index } = props

  const toggleColour = colourIndex => {
    const index = colours.indexOf(colourIndex)
    if (index < 0) {
      colours.push(colourIndex)

    } else {
      colours.splice(index, 1)
    }

    setColours([ ...colours ])
  }


  const className = colours.indexOf(index) < 0
                  ? ""
                  : "taken"


  return (
    <StyledChip
      { ...props }
      className={className}
      onClick={() => toggleColour(index)}
    >
      <span
        { ...props }
      >
        {index + 1}
      </span>
    </StyledChip>
  )
}