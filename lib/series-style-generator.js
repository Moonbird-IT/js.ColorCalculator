Moonbird = window.Moonbird || {};
Moonbird.Component = Moonbird.Component || {};

Moonbird.Component.SeriesStyleGenerator = function(colorPalette, exceptionColorPalette, lineStyles) {
  let self = {};
  self.registeredColors = {};

  let colors = ['#1a79bf', '#68c4f2', '#9f5edf', '#6b8299', '#5c6371', '#78b8a0', '#98bedb', '#df90f2', '#0c369a',
  	'#9dc742', '#58b947', '#00814f'];
  let exceptionColors = ['#f04e56', '#f26522', '#c1363d', '#f4ca25', '#d1a700', '#ef9ea3'];
  let dashStyles = ['Solid', 'Dash', 'Dot', 'LongDashDot', 'ShortDashDotDot', 'ShortDash', 'ShortDot',
    'LongDash', 'ShortDashDot', 'LongDashDot'
  ];

  let highlightString = null;
  let lastStandardCounter = 0;
  let lastHighlightCounter = 0;

  let [currentColor, currentExceptionColor, currentNormalStyle, currentExceptionStyle] = Array(4).fill(0);

  // Initialization
  if (colorPalette) {
    colors = colorPalette;
  }
  if (lineStyles) {
    dashStyles = lineStyles;
  }
  if (exceptionColorPalette) {
    exceptionColors = exceptionColorPalette;
  }

  self.registerStringToHighlight = function(string) {
    highlightString = string;
  }

  self.assign = function(string) {

    // check if the string already has an assigned color:
    if (self.registeredColors[string]) {
      return self.registeredColors[string];
    }

    let style;
    if (highlightString && string.indexOf(highlightString) === 0) {
      style = {
        Color: exceptionColors[currentExceptionColor],
        Style: dashStyles[currentExceptionStyle]
      };
      currentExceptionColor++;
      if (currentExceptionColor === exceptionColors.length) {
        currentExceptionStyle++;
        if (currentExceptionStyle === dashStyles.length) {
          console.warn("SeriesStyleGenerator", "Ran out of exception colors and styles, restarting.");
          currentExceptionStyle = 0;
        }
        currentExceptionColor = 0;
      }
    } else {
      style = {
        Color: colors[currentColor],
        Style: dashStyles[currentNormalStyle]
      };
      currentColor++;
      if (currentColor === colors.length) {
        currentNormalStyle++;
        if (currentNormalStyle === dashStyles.length) {
          console.warn("SeriesStyleGenerator", "Ran out of normal colors and styles, restarting.");
          currentNormalStyle = 0;
        }
        currentColor = 0;
      }
    }

    self.registeredColors[string] = style;
    return style;
  }

  return self;
}