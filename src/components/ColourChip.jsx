/**
 * ColourChip.jsx
 */

import styled from 'styled-components'


const path = `path('
  M 200 100
  A 100 100 90 0 1 100 200
  L 100 160
  A 60 60 90 0 0 160 100
  z
')`


const getPath = ({ rx, ry, r, ratio, start, arc }) => {
  const innerRadius = r * ratio
  const startRad = Math.PI * start / 180
  const endAngle = start + arc
  const endRad = Math.PI * (endAngle) / 180  

  // Calculate from start
  const startX = rx + ( r *  Math.sin(startRad) )
  const startY = ry - ( r *  Math.cos(startRad) )

  // Calculate from start + arc
  const outerX = rx + ( r * Math.sin(endRad) )
  const outerY = ry - ( r * Math.cos(endRad) )

  // Calculate from start + arc and ratio
  const innerX = rx + innerRadius * Math.sin(endRad) 
  const innerY = ry - innerRadius * Math.cos(endRad)
  // Calculate from start and ratio
  const endX = rx + innerRadius * Math.sin(startRad) 
  const endY = ry - innerRadius * Math.cos(startRad)

  return `path('
    M ${startX} ${startY}
    A ${r} ${r} ${arc} 0 1 ${outerX} ${outerY}
    L ${innerX} ${innerY}
    A ${innerRadius} ${innerRadius} ${arc} 0 0 ${endX} ${endY}
    z
  ')`
}


const StyledChip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  clip-path: ${props => getPath(props)};
  background-color: ${props => props.bgColor}
`

export const ColourChip = (props) => {
  

  return (
    <StyledChip
      className="chip"
      { ...props }
    >

    </StyledChip>
  )
}