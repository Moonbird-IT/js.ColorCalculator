Moonbird = window.Moonbird || {};
Moonbird.Component = Moonbird.Component || {};

Moonbird.Component.ColorCalculator = function () {
  let self = {};
  self.registeredColors = [];

  let highlightString = null;

  let toHex = function (d) {
    return ("0" + (Number(d).toString(16))).slice(-2).toUpperCase()
  };

  self.registerStringToHighlight = function (string) {
    highlightString = string;
  }

  self.generate = function (string, suffix) {

    if (!suffix) {
      suffix = '';
    }

    let isHighlight = highlightString && string.indexOf(highlightString) === 0;

    // check if the string already has an assigned color:
    let colorCheck = self.registeredColors.filter(function (x) {
      return x.Name === string;
    });
    if (colorCheck.length && colorCheck[0].Name) {
      return colorCheck[0].Color;
    }

    let combinedString = string + suffix;
    const chunkSize = Math.ceil(combinedString.length / 3);
    let colorString = '#';
	
    for (let i = 0; i < combinedString.length; i += chunkSize) {

      const chunk = combinedString.slice(i, i + chunkSize);
      let sum = 0;
	  
      for (let j = 0; j < chunk.length; j++) {
        sum += chunk.charCodeAt(j);
      }

      // generate the color parts, with a range of 10-246 to avoid pure black and white, handle exeptions specially by toning to red:
      if (isHighlight) {
        if (i === 0) {
          colorString += toHex(255);
        } else {
          colorString += toHex(Math.floor(sum % 127) + 10);
        }
      } else {
        if (i === 0) {
          colorString += toHex(Math.floor(sum % 127) + 10);
        } else {
          colorString += toHex(Math.floor(sum % 236) + 10);
        }
      }
    }

    let checkColor = self.registeredColors.filter(function (x) {
      return x.Color === colorString;
    });
    // check if the some color was used before; if so, generate a new color:
    if (checkColor.length > 0 && checkColor[0].Name !== string) {
      colorString = self.generate(string, suffix += '...');
    } else {
      self.registeredColors.push({
        Name: string,
        Color: colorString
      });
    }
    return colorString;

  }
  return self;
}