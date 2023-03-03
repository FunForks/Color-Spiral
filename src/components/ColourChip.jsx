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
      { ...props }
    >

    </StyledChip>
  )
}