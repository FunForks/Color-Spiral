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
  hRatio: ratio,
  hStart: start,
  hArc:   arc
}) => {

  return getPath({ cx, cy, r, ratio, start, arc })
}


const getTextPath = ({ cx, cy, textRadius: r, start, arc }) => {
  const startRad = Math.PI * start / 180
  const endAngle = start + arc
  const endRad = Math.PI * (endAngle) / 180

  // Calculate from start
  const startX = cx + ( r *  Math.sin(startRad) )
  const startY = cy - ( r *  Math.cos(startRad) )

  // Calculate from start + arc
  const endX = cx + ( r * Math.sin(endRad) )
  const endY = cy - ( r * Math.cos(endRad) )

  return `
    M ${startX} ${startY}
    A ${r} ${r} ${arc} 0 1 ${endX} ${endY}
  `
}


const getSpanCSS = ({ cx, cy, midRadius, midRadians }) => {
  const left = cx + ( midRadius *  Math.sin(midRadians) )
  const top = cy - ( midRadius *  Math.cos(midRadians) )

  return `
  position: absolute;
  top: ${top}px;
  left: ${left}px;
  transform: translate(-50%, -50%);
  `
}


const getFontSize = ({ midRadius, fontRatio }) => {
  let size = midRadius * fontRatio
  if (size < 7) {
    size = 0
  }

  return size+"px"
}


const StyledChip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  clip-path: ${props => props.clipPath};
  background-color: ${props => props.bgcolor};
  font-size: ${props => props.fontSize};
  cursor: pointer;

  &.checked,
  &.selected {
    cursor: default
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
    clip-path: ${props => props.afterPath};
  }

  &.checked::after,
  &.selected::after {
    background-color: ${props => props.bgcolor};
  }

  & span {
    ${props => props.spanCSS};
    color: #000;
    z-index: 1;
  }

  &.checked span {
    color: ${props => props.locolor};
  }

  &.selected span {
    color: #fff; // ${props => props.hicolor};
  }

  & svg {
    position: relative;
    z-index: 2;
    fill: #fff9;
  }
  &.selected svg {
    fill: #fff;
  }
`


// Component

export const ColourChip = (props) => {
  const {
    index,
    name,
    item,
    checked,
    updateColours,
    toggleChipColour,
    size } = props
  const id = `${name}_${index}`

  // console.log("props:", props);
  //
  // key:           <not a prop; undefined>
  // index:         0
  // name:          ""
  // r:             115.95833587646484 p
  // cx:            115.95833587646484 psa
  // cy:            115.95833587646484 psa
  // ratio:         0.6667             p
  // arc:           52.5               p
  // start:         -26.25             p
  // midRadians:    0                   s
  // midRadius:     96.63387920265198   s
  // hArc:          51.1                 a
  // hr:            114.7987525177002    a
  // hRatio:        0.6833674999999999   a
  // hStart:       -25.55                a
  // bgcolor:       "#aa5500"
  // hicolor:       "#d46a00"
  // locolor:       "#7f3f00"
  // checked:       <boolean>
  // selected:      <boolean>
  // updateColours: <function>
  // item:          { name: "Client", index: 0 }
  //
  // p=getPath; s=getSpanCSS; a=getAfterPath

  const selected = item.index === index


  const newColour = () => {
    if (className === "available") {
      item.index = index
      updateColours()
    }
  }


  const updateCentre = (event) => {
    const revert = event.type === "mouseleave"
                || selected
                || checked
    const colour = revert ? undefined : index
    toggleChipColour(colour)
  }


  const svg = (
    <svg
      width={size}
      height={size}
    >
      <path
        id={id}
        d={getTextPath(props)}
        fill="none"
      />
      <text>
        <textPath
          alignmentBaseline="top"
          xlinkHref={`#${id}`}
          startOffset="50%"
          textAnchor="middle"
        >
          {name}
        </textPath>
      </text>
    </svg>
  )

  // .selected will appear with a highlight
  // .checked will appear with desaturated colours
  // .available will allow a colour change
  // Any element without .available will have no effect other
  // than to allow another click outside the Picker to close it.
  const className = selected
                  ? "selected"
                  : checked
                    ? "checked"
                    : "available"

  const clipPath  = getPath(props);
  const afterPath = getAfterPath(props);
  const fontSize  = getFontSize(props)
  const spanCSS   = getSpanCSS(props);


  return (
    <StyledChip
      clipPath={clipPath}
      afterPath={afterPath}
      spanCSS={spanCSS}
      bgcolor={props.bgcolor}
      locolor={props.locolor}
      hicolor={props.hicolor}
      fontSize={fontSize}

      className={className}
      onClick={newColour}
      onMouseEnter={updateCentre}
      onMouseLeave={updateCentre}
    >
      {/* <span>
        {index + 1}
      </span> */}
      {svg}
    </StyledChip>
  )
}