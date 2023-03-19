/**
 * ColourPicker.jsx
 */

import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { ColourChip } from './ColourChip'
import { getGoldenAngleAt } from '../tools/colors'
import { getChipColours } from '../api/colourGenerator'


const StyledDiv = styled.div`
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
  z-index: ${props => props.open ? 1 : 0};

  // --size: 90vmin;
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: var(--size);
  // height: var(--size);
  // border-radius: var(--size);
  // background-color: #000;
  // border: 1px solid #333;
  // box-sizing: border-box;
`


const StyledChips = styled.div`
  --scale: ${props => props.scale}em;
  --offset: calc((var(--scale) - 1em) / -2);
  position: absolute;
  width: var(--scale);
  height: var(--scale);
  border-radius: var(--scale);
  background-color: #181818;
  border: 1px outset #6663;
  filter: drop-shadow(4px 4px 4px #000);

  top: var(--offset);
  left: var(--offset);
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
  radiusReduction:    0.9505,

  // Selection/highlight settings
  selectedRadius:     0.99,
  selectedEdge:       0.7,
  selectedInnerRatio: 1.025,

  // Optimal size
  scale: 30, //  5 //  9 // 10 // 15 // 20 // 30 // 40 // 60 // 80
  total: 62  // 33 // 44 // 49 // 57 // 62 // 70 // 75 // 83 // 89
}
/***************************************************************
 ** HARD-CODED **** HARD-CODED *** HARD-CODED **** HARD-CODED **
 ***************************************************************/




export const ColourPicker = (props) => {
  const {
 // name,         // string (unused here)
    index,        // integer originally used to calculate colour
    colour,       // hex representation of colour
    colours,      // [ { name, index, colour }, ... ]
    updateColours // function
  } = props

  const [ open, setOpen ] = useState(false)
  const pickerRef = useRef()


  const [ sizes, setSizes ] = useState({ r: 0, cx: 0, cy: 0, scale: 1})
  let { r } = sizes
  const { cx, cy } = sizes


  const {
    // Layout settings
    arcDegrees:         arc,
    firstChipDegrees,
    innerRadiusRatio:   ratio,
    radiusReduction:    reduce,

    // Selection/highlight settings
    selectedRadius,
    selectedEdge,
    selectedInnerRatio,

    total
  } = SETTINGS


  const resize = () => {
    const picker =  pickerRef.current
    const { width, height } = picker.getBoundingClientRect()
    const {
      width: portWidth,
      height: portHeight
    } = document.body.getBoundingClientRect()
    const scale = Math.min(
      portWidth / width,
      portHeight/ height,
      SETTINGS.scale
    )
    const r = (Math.min(width, height) / 2) * scale
    const [ cx, cy ] = [ r, r ]
    setSizes({ r, cx, cy, scale })

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
        }
      }

      window.addEventListener("mousedown", listener, options)
    }

    setOpen(!open)
  }

  const hratio = ratio * selectedInnerRatio
  const harc   = arc - selectedEdge * 2


  const shared = {
    cx,
    cy,
    r,
    ratio,
    arc
  }


  const setColour = () => {

  }


  const chips = Array(total).fill(0).map(( _, index ) => {
    const radius = r // r will be reduced for next chip, below
    const start  = getGoldenAngleAt(index) + firstChipDegrees
    const colors = getChipColours(index)
    // { bgcolor, hicolor, locolor }

    // Calculate where to centre the number span
    const midradians = Math.PI * (start + arc / 2) / 180
    const midradius  = r * (1 + ratio) / 2

    // Selection/highlight dimensions
    const highlightDimensions = {
      hr: r * selectedRadius,
      harc,
      hstart: start + selectedEdge,
      hratio
    }

    // Prepare for next chip
    r = r * reduce

    return (
      <ColourChip
        key={index}
        { ...shared }
        start={start}
        index={index}
        r={radius}
        midradians={midradians}
        midradius={midradius}
        { ...colors }
        { ...highlightDimensions }

        onClick={setColour}
        // taken={false}
      />
    )
  })


  return (
    <StyledDiv
      ref={pickerRef}
      open={open}
    >
      { open && (
        <StyledChips
          scale={sizes.scale}
        >
          {chips}
        </StyledChips>
       )
      }
      <StyledButton
        onClick={toggleOpen}
        open={open}
        bgcolor={colour}
      />
    </StyledDiv>
  )
}