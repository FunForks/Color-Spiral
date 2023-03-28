# Color Spiral #

This proof-of-concept project displays a spiral of colours which fit together in a _Golden Ratio_ sequence.

[Check out the demo](https://funforks.github.io/Color-Spiral/)



Using hues that are separated from each other by (the Golden Angle)[https://medium.com/@winwardo/simple-non-repeating-colour-generation-6efc995832b8] means that a series of consecutive colours are optimally far apart.

## Use cases for colours defined by the Golden Ratio
Suppose you want each player in a game to have an avatar with a different colour, but you don't know how many players there will be. You can arrange for each new player to have the next colour in sequence.

Suppose you run a school and want to create a timetable with a different colour for each subject. You can assign the next colour in the series to each new subject that you add.

## Use cases for this Colour Spiral picker
In a team game, you might want to give each player in a given team to have closely related, but easily distinguished colours.

In a school timetable, you might want to divide subjects into different categories: science, humanities, sports, practical work... The Colour Spiral allows you to give each category a distinctive colour, and to give subjects in that category a variation of that colour.

## How the Colour Spiral works
Each colour chip is created by using `clip-path` to display only one arc-shaped piece of a square `<div>` element. Each successive chip is shown with a slightly smaller outer radius. The width and thickness of each chip is set by numbers that were fine-tuned by hand. Feel free to adjust these numbers in the ColourPicker script to obtain a customized display.

The borders for the highlighted and unavailable colours are created the same way, using white or grey, and then the coloured centre of the chip is an `::after` pseudo-element with a slightly different `clip-path`.

The text that follows the curve of an arc is created using an `<svg>` element, with `<path>`, `<text>` and `<text-path>` sub-elements.

Each coloured item is created from an object with two entries: `{ name: <string>, index: <integer> }`. The integer `index` defines which colour to use.

## Enjoy!