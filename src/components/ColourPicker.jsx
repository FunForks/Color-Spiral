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
  position: absolute;
  width: 19em;
  height: 19em;
  border-radius: 19em;
  background-color: #181818;
  border: 1px outset #6663;
  filter: drop-shadow(4px 4px 4px #000);

  top: -9em;
  left: -9em;
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
  // top: -1em;
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
  selectedInnerRatio: 1.025
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


  const [ sizes, setSizes ] = useState({ r: 0, cx: 0, cy: 0})
  let { r } = sizes
  const { cx, cy } = sizes



  const resize = () => {
    const picker =  pickerRef.current
    const { width, height } = picker.getBoundingClientRect()
    const r = (Math.min(width, height) / 2) * 19
    const [ cx, cy ] = [ r, r ]
    setSizes({ r, cx, cy })

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


  const {
    // Layout settings
    arcDegrees:         arc,
    firstChipDegrees,
    innerRadiusRatio:   ratio,
    radiusReduction:    reduce,

    // Selection/highlight settings
    selectedRadius,
    selectedEdge,
    selectedInnerRatio
  } = SETTINGS

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


  const chips = Array(64).fill(0).map(( _, index ) => {
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
        <StyledChips>
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