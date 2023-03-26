/**
 * ColourPicker.jsx
 */

import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { ColourChip } from './ColourChip'
import { getGoldenAngleAt } from '../tools/colors'
import { getChipColours } from '../api/colourGenerator'


const StyledDiv = styled.div`
  --size: 1em; /* MUST BE 1em: ALL CALCULATIONS ARE BASED ON THIS */
  --transition: 250ms ease-out;
  position: relative;
  display: inline-block;
  width: var(--size);
  height: var(--size);
  left: 0;
  top: 0;
  ${props => props.open
           ? `left: ${props.offsetX}px;
              top: ${props.offsetY}px;
              z-index: 1;
              transition: var(--transition);
              `
           : ""
  };
`


const StyledChips = styled.div`
  --scale: ${props => props.scale};
  --size: calc(1em * var(--scale));
  --offset: calc((var(--size) - 1em) / -2);

  position: absolute;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  box-sizing: border-box;
  background-color: inherit;
  filter: drop-shadow(1em 1em 1em #000);
  top: var(--offset);
  left: var(--offset);

  ${props =>
    props.open
    ? `transition: var(--transition);`
    : `transform: scale(calc(1 / var(--scale)));`
  }
`


const StyledButton = styled.div`
  position: relative;
  width: 1em;
  height: 1em;
  border-radius: 1em;
  background-color: ${props => props.bgcolor};
  box-sizing: border-box;
  border:
    0.1em
    ${props => props.open ? "solid" : "outset"}
    ${props => props.bgcolor};
`

/***************************************************************
 ** HARD-CODED **** HARD-CODED *** HARD-CODED **** HARD-CODED **
 **                                                           **
 ** These settings define the width and breadth of the chips. **
 ** the amount of blank space between them, and the thickness **
 ** of the border for highlighted or already selected colours **
 ***************************************************************/
const SETTINGS = {
  // Layout settings
  arcDegrees:         52.5,
  firstChipDegrees:  -26.25, // half of arcDegrees
  innerRadiusRatio:   0.6667,
  textRadiusRatio:    0.825,
  radiusReduction:    0.9505,
  fontRatio:          0.166667,

  // Selection/highlight settings
  selectedRadius:     0.99,
  selectedEdge:       0.7,
  selectedInnerRatio: 1.025,

  // Optimal size
  scale: 30, //  5 //  9 // 10 // 15 // 20 // 30 // 40 // 60 // 80
  total: 70  // 33 // 44 // 49 // 57 // 62 // 70 // 75 // 83 // 89
}
/***************************************************************
 ** HARD-CODED **** HARD-CODED *** HARD-CODED **** HARD-CODED **
 ***************************************************************/




export const ColourPicker = (props) => {
  const {
    item,           // { name, index }
    colours,         // [ { name, index }, ... ]
    setColours    // function
  } = props


  const [ open, setOpen ] = useState(false)
  const pickerRef = useRef()
  const [ sizes, setSizes ] = useState({
    size: 0,
    r: 0,
    cx: 0,
    cy: 0,
    scale: 1,
    offsetX: 0,
    offsetY: 0
  })
  let { r } = sizes
  const { size, cx, cy } = sizes

  const checked = colours.map( colour => colour.index)
                         .filter( index => index !== item.index)

  const indexedNames = colours.reduce((map, {index, name}) => {
    map[index] = name
    return map
  }, {})

  const {
    // Layout settings
    arcDegrees:         arc,
    firstChipDegrees,
    innerRadiusRatio:   ratio,
    textRadiusRatio,
    radiusReduction:    reduce,
    fontRatio,

    // Selection/highlight settings
    selectedRadius,
    selectedEdge,
    selectedInnerRatio,

    total
  } = SETTINGS


  const { bgcolor } = getChipColours(item.index)

  const updateColours = () => {
    // The appropriate object in the colours array will
    // already have been updated
    setColours([ ...colours ])
    setOpen(false)
  }

  const resize = () => {
    // Calculate optimal scale for smaller viewports
    const picker =  pickerRef.current
    const {
      top,
      left,
      right,
      bottom,
      width,
      height,
    } = picker.getBoundingClientRect()
    const {
      width: portWidth,
      height: portHeight
    } = document.body.getBoundingClientRect()
    const scale = Math.min(
      portWidth / width,
      portHeight / height,
      SETTINGS.scale
    )

    // Calculate offset to ensure Picker is fully onscreen
    const flange = (width * (scale - 1) / 2)
    let offsetX = flange - left // move right if needed
    if (offsetX < 0) {
      // move left if needed
      offsetX = Math.min(0, portWidth - (right + flange))
    }
    let offsetY = flange - top // move down if needed
    if (offsetY < 0) {
      // move up if needed
      offsetY = Math.min(0, portHeight - (bottom + flange))
    }

    const size = Math.min(width, height) * scale
    const r = size / 2
    const [ cx, cy ] = [ r, r ]
    setSizes({ size, r, cx, cy, scale, offsetX, offsetY })

    window.addEventListener("resize", resize, {once: true})
  }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(resize, [])

  // First click opens the Picker, a second click anywhere will
  // close it
  const toggleOpen = (event) => {
    if ( !open && event.type === "click" ) {
      // The Picker is opening. Ensure that a `mousedown` outside
      // will close the button, while if there is a second `click`
      // on the Picker itself, the `mousedown` action will be
      // ignored.
      const options = { once: true }
      const listener = (event) => {
        if (!(pickerRef.current).contains(event.target)) {
          // The click was not on the Picker, so close it.
          setOpen(false)
        } else {
          if (!event.target.closest(".available")) {
            window.addEventListener("mousedown", listener, options)
          }
        }
      }

      window.addEventListener("mousedown", listener, options)
    }

    setOpen(!open)
  }

  const hRatio = ratio * selectedInnerRatio
  const hArc   = arc - selectedEdge * 2


  const shared = {
    cx,
    cy,
    r,
    ratio,
    arc
  }


  const chips = Array(total).fill(0).map(( _, index ) => {
    if (!open) {
      return ""
    }

    const name = indexedNames[index] || ""

    const radius = r // r will be reduced for next chip, below
    const start  = getGoldenAngleAt(index) + firstChipDegrees
    const colors = getChipColours(index)
    // { bgcolor, hicolor, locolor }

    // Calculate where to centre the number span
    const midRadians = Math.PI * (start + arc / 2) / 180
    const midRadius  = r * (1 + ratio) / 2

    // Selection/highlight dimensions
    const highlightDimensions = {
      hr: r * selectedRadius,
      hArc,
      hStart: start + selectedEdge,
      hRatio
    }

    // Prepare for next chip
    r = r * reduce

    return (
      <ColourChip
        key={index}
        index={index}
        name={name}
        { ...shared }
        start={start}
        r={radius}
        size={size}
        midRadians={midRadians}
        midRadius={midRadius}
        textRadius={r * textRadiusRatio}
        fontRatio={fontRatio}
        { ...highlightDimensions }
        { ...colors }

        item={item}
        checked={checked.indexOf(index) >= 0}
        updateColours={updateColours}
      />
    )
  })


  return (
    <StyledDiv
      ref={pickerRef}
      open={open}
      offsetX={sizes.offsetX}
      offsetY={sizes.offsetY}
    >
      <StyledChips
        scale={ sizes.scale }
        open={open}
      >
        {chips}
      </StyledChips>
      <StyledButton
        onClick={toggleOpen}
        open={open}
        bgcolor={bgcolor}
      />
    </StyledDiv>
  )
}