# js.ColorCalculator

Component to generate HEX colors based on a strings. If a color has been used before by a different string,
a new color will be generated that will be distinct from the previous one.

# Usage

1. Include the library into your application:

    `<script src="lib/color-calculator.js"></script>`

2. Create a new instance of the ColorCalculator:

    `let colorCalculator = new Moonbird.Component.ColorCalculator();`
	
3. If desired, define a condition to generate a highlight based on start of string (will be shown in more yellow-red tones):

    `colorCalculator.registerStringToHighlight("Highlight");`	

4. Generate a color based on a given string:

    `let color = colorCalculator.generate("Highlight is just a word"); // will be highlighted`
    `let color = colorCalculator.generate("The highlight is not the start"); // will not be highlighted`

# Demo

See the [demo](demo/index.html) for a sample.