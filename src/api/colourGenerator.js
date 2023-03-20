/*
 * colourGenerator.js
 *
 * getChipColours accepts a number argument and returns an object
 * with colour properties that can be usedfor displaying a colour
 * chip or button, with a background, a highlight and a shadow:
 *
 * { bgcolor,
 *   hicolor,
 *   locolor
 * }
 *
 * The `number` argument can be any number, but using a sequence
 * of whole numbers (0, 1, 2, ...) will produce a sequence of
 * colours that are optimally distant from each other.
 *
 * Using the default hard-coded settings, colours generated from
 * higher numbers will be darker.
 */


import {
  GOLDEN_ANGLE,
  getColor,
  toneColor
} from '../tools/colors'


/****************************************************************
 ** HARD-CODED **** HARD-CODED **** HARD-CODED **** HARD-CODED **
 **                                                            **
 ** DO NOT CHANGE COLOUR SETTINGS AFTER THE PROJECT GOES LIVE  **
 ** OR THE COLOURS THAT ARE GENERATED MAY CHANGE UNEXPECTEDLY  **
 ****************************************************************/
const luminosity             = 0.3333
const fadeRatioForLuminosity = 0.98
const saturation             = 1.0
const firstHueDegrees        = 30 // 0: red, 120: green, 240: blue
const highlightRatio         = 1.25
const darkenRatio            = 0.85
/****************************************************************
 ** HARD-CODED **** HARD-CODED **** HARD-CODED **** HARD-CODED **
 ****************************************************************/


const firstHueOffset = firstHueDegrees / GOLDEN_ANGLE



export const getChipColours = number => {
  const l = luminosity * Math.pow(fadeRatioForLuminosity, number)
  number += firstHueOffset

  const bgcolor = getColor({
    number,
    l,
    s: saturation,
    format: "hex"
  })

  const colors = {
    bgcolor,
    hicolor: "#fff", // toneColor(bgcolor, highlightRatio),
    locolor: toneColor(bgcolor, darkenRatio)
  }

  return colors
}