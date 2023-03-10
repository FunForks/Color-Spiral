/**
 * ColourPicker.jsx
 */

import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { ColourChip } from './ColourChip'
import { getGoldenAngleAt } from '../tools/colors'
import { getChipColours } from '../api/colourGenerator'



const StyledDiv = styled.div`
  --size: 90vmin;
  position: relative;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: #000;
  border: 1px solid #333;
  box-sizing: border-box;
`


/***************************************************************
 ** HARD-CODED **** HARD-CODED *** HARD-CODED **** HARD-CODED **
 ***************************************************************/
const SETTINGS = {
  // Layout settings
  arcDegrees:         52.5,
  firstChipDegrees:  -26.25,
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



export const ColourPicker = () => {
  const [ sizes, setSizes ] = useState({ r: 0, cx: 0, cy: 0})
  let { r } = sizes
  const { cx, cy } = sizes
  const pickerRef = useRef()


  const resize = () => {
    window.removeEventListener("resize", resize, false)

    const picker =  pickerRef.current
    const { width, height } = picker.getBoundingClientRect()
    const r = (Math.min(width, height) / 2)
    const [ cx, cy ] = [ r, r ]
    setSizes({ r, cx, cy })

    window.addEventListener("resize", resize, false)
  }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(resize, [])


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
      />
    )
  })


  return (
    <StyledDiv
      ref={pickerRef}
    >
      {chips}
    </StyledDiv>
  )
}