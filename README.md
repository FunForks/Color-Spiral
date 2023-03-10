# Color Spiral #

This proof-of-concept project displays a spiral of colours which fit together in a _Golden Ratio_ sequence.

[Check out the demo](https://funforks.github.io/Color-Spiral/)

Suppose you want each player in a game to have an avatar with a different colour, but you don't know how many players there will be. Using hues that are separated from each other by (the Golden Angle)[https://medium.com/@winwardo/simple-non-repeating-colour-generation-6efc995832b8] means that a series of consecutive colours are optimally far apart.

The numbers indicate the order in which the colours were generated. In a real project, the numbers might not be necessary.

If you click on a colour chip, you will toggle the way it is displayed. This is just a simulation. In a real project, this might indicate that the colour has already been selected by another player.

Each colour chip is created by using `clip-path` to display only one arc-shaped piece of a square `<div>` element. Each successive chip is shown with a slightly smaller outer radius. The width and thickness of each chip is set by numbers that were fine-tuned by hand. Feel free to adjust these numbers in the ColourPicker script to obtain a customized display.

## Enjoy!