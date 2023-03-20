/**
 * ColourChip.jsx
 */


import styled from 'styled-components'



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

  &.checked,
  &.selected {
    cursor: grab; /* no "revert" cursor is available */
  }
  &.checked {
    background-color: #888; // ${props => props.locolor};
  }
  &.selected {
    background-color: ${props => props.hicolor};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    clip-path: ${props => getAfterPath(props)};
  }

  &.checked::after,
  &.selected::after {
      background-color: ${props => props.bgcolor};
  }

  & span {
    ${props => getSpanCSS(props)};
    color: #000;
    z-index: 1;
  }

  &.checked span {
    color: ${props => props.locolor};
  }

  &.selected span {
    color: #fff; // ${props => props.hicolor};
  }
`


// Component

export const ColourChip = (props) => {
  const { index, setColour, selected, checked } = props

  // cx, cy, r, ratio, start, arc
  // console.log("props:", props);
  // key:        <not a prop; undefined>
  // index:      0
  // r:          115.95833587646484 p
  // cx:         115.95833587646484 psa
  // cy:         115.95833587646484 psa
  // ratio:      0.6667             p
  // arc:        52.5               p
  // start:      -26.25             p
  // midradians: 0                   s
  // midradius:  96.63387920265198   s
  // harc:       51.1                 a
  // hr:         114.7987525177002    a
  // hratio:     0.6833674999999999   a
  // hstart:    -25.55                a
  // bgcolor:    "#aa5500"
  // hicolor:    "#d46a00"
  // locolor:    "#7f3f00"
  // checked:    <boolean>
  // selected:   <boolean>
  // onClick:    function setColour()
  //
  // p=getPath; s=getSpanCSS; a=getAfterPath


  const className = selected
                  ? "selected"
                  : checked
                    ? "checked"
                    : ""

  return (
    <StyledChip
      { ...props }
      className={className}
      onClick={() => setColour(index)}
    >
      <span
        { ...props }
      >
        {index + 1}
      </span>
    </StyledChip>
  )
}