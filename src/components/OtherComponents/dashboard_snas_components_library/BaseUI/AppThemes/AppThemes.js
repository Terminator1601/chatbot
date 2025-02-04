
// Will be calculated dynamically
window.themeColors = {};

let createThemeColor = function(theme) {
    let themeRGB = hex2rgb(appThemes[theme]['color']);

    if (themeRGB !== undefined) {
        let buttonFocusShadeRed = Math.ceil(themeRGB['red'] + (0 - themeRGB['red']) * 0.2);
        let buttonFocusShadeGreen = Math.ceil(themeRGB['green'] + (0 - themeRGB['green']) * 0.2);
        let buttonFocusShadeBlue = Math.ceil(themeRGB['blue'] + (0 - themeRGB['blue']) * 0.2);
        let borderShadeRed = Math.ceil(themeRGB['red'] + (0 - themeRGB['red']) * 0.4);
        let borderShadeGreen = Math.ceil(themeRGB['green'] + (0 - themeRGB['green']) * 0.4);
        let borderShadeBlue = Math.ceil(themeRGB['blue'] + (0 - themeRGB['blue']) * 0.4);

        let appFontColor;
        let colorFontForFilter ;
        if (appThemes[theme]['contrastFontColor'] !== "") {
            let contrastFontRGB = hex2rgb(appThemes[theme]['contrastFontColor']);
            appFontColor = create_RGBA_string(contrastFontRGB['red'], contrastFontRGB['green'], contrastFontRGB['blue'], 1);
            colorFontForFilter = new Color(contrastFontRGB['red'], contrastFontRGB['green'], contrastFontRGB['blue']);
        } else {
            let foreGroundValue = (((themeRGB['red'] * 299 + themeRGB['red'] * 587 + themeRGB['red'] * 114) / 1000) - 128) * -1000;
            appFontColor = create_RGBA_string(foreGroundValue, foreGroundValue, foreGroundValue, 1);
            if(appFontColor === "rgba(255, 255, 255, 1)"){
                colorFontForFilter = new Color(255, 255, 255);
            }
            else{
                colorFontForFilter = new Color(0, 0, 0);
            }
        }
        const solverFont = new Solver(colorFontForFilter);
        const resultFont = solverFont.solve();

        let appFilterFontColor = "invert(99%) sepia(2%) saturate(2%) hue-rotate(17deg) brightness(118%) contrast(100%)";
        if (resultFont.loss < 5) {
            appFilterFontColor = resultFont.filter;
        }


        const color = new Color(themeRGB['red'], themeRGB['green'], themeRGB['blue']);
        const solver = new Solver(color);
        const result = solver.solve();

        /*
        let lossMsg;
        if (result.loss < 1) {
            lossMsg = 'This is a perfect result.';
        } else if (result.loss < 5) {
            lossMsg = 'The is close enough.';
        } else if (result.loss < 15) {
            lossMsg = 'The color is somewhat off. Consider running it again.';
        } else {
            lossMsg = 'The color is extremely off. Run it again!';
        }
        */
        let appFilterColor = "invert(9%) sepia(10%) saturate(519%) hue-rotate(187deg) brightness(95%) contrast(89%)";
        if (result.loss < 5) {
            appFilterColor = result.filter;
        }

        let appColor = create_RGBA_string(themeRGB['red'], themeRGB['green'], themeRGB['blue'], 1);
        let appBoxShadowColor = create_RGBA_string(themeRGB['red'], themeRGB['green'], themeRGB['blue'], 0.5);
        let appButtonFocusColor = create_RGBA_string(buttonFocusShadeRed, buttonFocusShadeGreen, buttonFocusShadeBlue, 1);
        let appBorderColor = create_RGBA_string(borderShadeRed, borderShadeGreen, borderShadeBlue, 1);

        return [appColor, appButtonFocusColor, appBorderColor, appBoxShadowColor, appFontColor, appFilterColor, appFilterFontColor];
    }
}

export function createThemeColorsJSON(){ // This is called at the end of this document.
    for(let themeName in appThemes) {
        let colorArray = createThemeColor(themeName);
        let themeColorJSON = {};
        themeColorJSON['appColor'] = colorArray[0];
        themeColorJSON['appButtonFocusColor'] = colorArray[1];
        themeColorJSON['appBorderColor'] = colorArray[2];
        themeColorJSON['appBoxShadowColor'] = colorArray[3];
        themeColorJSON['appFontColor'] = colorArray[4];
        themeColorJSON['appFilterColor'] = colorArray[5];
        themeColorJSON['appFilterFontColor'] = colorArray[6];
        window.themeColors[themeName] = themeColorJSON;
    }
    let stylesElement = document.createElement('style');
    let appendElement = "/*CSS for App Theme*/";
    for(let themeName in appThemes) {
        let colorArray = createThemeColor(themeName);
        appendElement = appendElement +
            '.btn-theme-' + themeName + ' {' +
            'color: ' + colorArray[4] + ' !important;' +
            'background-color: ' + colorArray[0] + ' !important;' +
            'border-color: ' + colorArray[0] + ' !important;' +
            '}'+
            '.btn-theme-' + themeName + ':hover {' +
            'color: ' + colorArray[4] + ' !important;' +
            'background-color: ' + colorArray[0] + ' !important;' +
            'border-color: ' + colorArray[2] + ' !important;' +
            '}'+
            '.btn-theme-' + themeName + '.selected-theme,' +
            '.btn-theme-' + themeName + '.focus,' +
            '.btn-theme-' + themeName + ':focus {' +
            'color: ' + colorArray[4] + ' !important;' +
            'background-color: ' + colorArray[1] + ' !important;' +
            'border-color: ' + colorArray[2] + ' !important;' +
            'box-shadow: 0 0 0 .2rem ' + colorArray[3] + ' !important;' +
            '}';
    }
    stylesElement.innerHTML = appendElement;
    document.head.appendChild(stylesElement);
}

let hex2rgb = function(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16)
    } : null;
};
let rgba2hex = function (orig) {
    let a, isPercent,
        rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
        alpha = (rgb && rgb[4] || "").trim(),
        hex = rgb ?
            (rgb[1] | 1 << 8).toString(16).slice(1) +
            (rgb[2] | 1 << 8).toString(16).slice(1) +
            (rgb[3] | 1 << 8).toString(16).slice(1) : orig;

    if (alpha !== "") {
        a = alpha;
    } else {
        a = '01';
    }
    // multiply before convert to HEX
    a = ((a * 255) | 1 << 8).toString(16).slice(1);
    hex = "#" + hex + a;

    return hex;
}

let create_RGBA_string = function(r, g, b, a) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
};

export const applyAppTheme = function(theme){
    let appTheme = window.themeColors[theme];
    if(appTheme){
        let bodyElement = document.querySelector("body");
        bodyElement.style.setProperty("--appColor", appTheme['appColor']);
        bodyElement.style.setProperty("--appButtonFocusColor", appTheme['appButtonFocusColor']);
        bodyElement.style.setProperty("--appBorderColor", appTheme['appBorderColor']);
        bodyElement.style.setProperty("--appBoxShadowColor", appTheme['appBoxShadowColor']);
        bodyElement.style.setProperty("--appFontColor", appTheme['appFontColor']);
        bodyElement.style.setProperty("--appFilterColor", appTheme['appFilterColor']);
        bodyElement.style.setProperty("--appFilterFontColor", appTheme['appFilterFontColor']);
    
    
        let classList = document.querySelector("body").classList;
        classList.forEach(function(className) {
            if (className.includes("theme-")) {
                bodyElement.classList.remove(className);
            }
        });
        bodyElement.classList.add("theme-" + theme);
    }
};

class Color {
    constructor(r, g, b) {
        this.set(r, g, b);
    }

    toString() {
        return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
    }

    set(r, g, b) {
        this.r = this.clamp(r);
        this.g = this.clamp(g);
        this.b = this.clamp(b);
    }

    hueRotate(angle = 0) {
        angle = angle / 180 * Math.PI;
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);

        this.multiply([
            0.213 + cos * 0.787 - sin * 0.213,
            0.715 - cos * 0.715 - sin * 0.715,
            0.072 - cos * 0.072 + sin * 0.928,
            0.213 - cos * 0.213 + sin * 0.143,
            0.715 + cos * 0.285 + sin * 0.140,
            0.072 - cos * 0.072 - sin * 0.283,
            0.213 - cos * 0.213 - sin * 0.787,
            0.715 - cos * 0.715 + sin * 0.715,
            0.072 + cos * 0.928 + sin * 0.072,
        ]);
    }

    grayscale(value = 1) {
        this.multiply([
            0.2126 + 0.7874 * (1 - value),
            0.7152 - 0.7152 * (1 - value),
            0.0722 - 0.0722 * (1 - value),
            0.2126 - 0.2126 * (1 - value),
            0.7152 + 0.2848 * (1 - value),
            0.0722 - 0.0722 * (1 - value),
            0.2126 - 0.2126 * (1 - value),
            0.7152 - 0.7152 * (1 - value),
            0.0722 + 0.9278 * (1 - value),
        ]);
    }

    sepia(value = 1) {
        this.multiply([
            0.393 + 0.607 * (1 - value),
            0.769 - 0.769 * (1 - value),
            0.189 - 0.189 * (1 - value),
            0.349 - 0.349 * (1 - value),
            0.686 + 0.314 * (1 - value),
            0.168 - 0.168 * (1 - value),
            0.272 - 0.272 * (1 - value),
            0.534 - 0.534 * (1 - value),
            0.131 + 0.869 * (1 - value),
        ]);
    }

    saturate(value = 1) {
        this.multiply([
            0.213 + 0.787 * value,
            0.715 - 0.715 * value,
            0.072 - 0.072 * value,
            0.213 - 0.213 * value,
            0.715 + 0.285 * value,
            0.072 - 0.072 * value,
            0.213 - 0.213 * value,
            0.715 - 0.715 * value,
            0.072 + 0.928 * value,
        ]);
    }

    multiply(matrix) {
        const newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
        const newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
        const newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
        this.r = newR;
        this.g = newG;
        this.b = newB;
    }

    brightness(value = 1) {
        this.linear(value);
    }
    contrast(value = 1) {
        this.linear(value, -(0.5 * value) + 0.5);
    }

    linear(slope = 1, intercept = 0) {
        this.r = this.clamp(this.r * slope + intercept * 255);
        this.g = this.clamp(this.g * slope + intercept * 255);
        this.b = this.clamp(this.b * slope + intercept * 255);
    }

    invert(value = 1) {
        this.r = this.clamp((value + this.r / 255 * (1 - 2 * value)) * 255);
        this.g = this.clamp((value + this.g / 255 * (1 - 2 * value)) * 255);
        this.b = this.clamp((value + this.b / 255 * (1 - 2 * value)) * 255);
    }

    hsl() {
        // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;

                case g:
                    h = (b - r) / d + 2;
                    break;

                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return {
            h: h * 100,
            s: s * 100,
            l: l * 100,
        };
    }

    clamp(value) {
        if (value > 255) {
            value = 255;
        } else if (value < 0) {
            value = 0;
        }
        return value;
    }
}

class Solver {
    constructor(target) {
        this.target = target;
        this.targetHSL = target.hsl();
        this.reusedColor = new Color(0, 0, 0);
    }

    solve() {
        const result = this.solveNarrow(this.solveWide());
        return {
            values: result.values,
            loss: result.loss,
            filter: this.css(result.values),
        };
    }

    solveWide() {
        const A = 5;
        const c = 15;
        const a = [60, 180, 18000, 600, 1.2, 1.2];

        let best = {
            loss: Infinity
        };
        for (let i = 0; best.loss > 25 && i < 3; i++) {
            const initial = [50, 20, 3750, 50, 100, 100];
            const result = this.spsa(A, a, c, initial, 1000);
            if (result.loss < best.loss) {
                best = result;
            }
        }
        return best;
    }

    solveNarrow(wide) {
        const A = wide.loss;
        const c = 2;
        const A1 = A + 1;
        const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
        return this.spsa(A, a, c, wide.values, 500);
    }

    spsa(A, a, c, values, iters) {
        const alpha = 1;
        const gamma = 0.16666666666666666;

        let best = null;
        let bestLoss = Infinity;
        const deltas = new Array(6);
        const highArgs = new Array(6);
        const lowArgs = new Array(6);

        for (let k = 0; k < iters; k++) {
            const ck = c / Math.pow(k + 1, gamma);
            for (let i = 0; i < 6; i++) {
                deltas[i] = Math.random() > 0.5 ? 1 : -1;
                highArgs[i] = values[i] + ck * deltas[i];
                lowArgs[i] = values[i] - ck * deltas[i];
            }

            const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
            for (let i = 0; i < 6; i++) {
                const g = lossDiff / (2 * ck) * deltas[i];
                const ak = a[i] / Math.pow(A + k + 1, alpha);
                values[i] = fix(values[i] - ak * g, i);
            }

            const loss = this.loss(values);
            if (loss < bestLoss) {
                best = values.slice(0);
                bestLoss = loss;
            }
        }
        return {
            values: best,
            loss: bestLoss
        };

        function fix(value, idx) {
            let max = 100;
            if (idx === 2 /* saturate */ ) {
                max = 7500;
            } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */ ) {
                max = 200;
            }

            if (idx === 3 /* hue-rotate */ ) {
                if (value > max) {
                    value %= max;
                } else if (value < 0) {
                    value = max + value % max;
                }
            } else if (value < 0) {
                value = 0;
            } else if (value > max) {
                value = max;
            }
            return value;
        }
    }

    loss(filters) {
        // Argument is array of percentages.
        const color = this.reusedColor;
        color.set(0, 0, 0);

        color.invert(filters[0] / 100);
        color.sepia(filters[1] / 100);
        color.saturate(filters[2] / 100);
        color.hueRotate(filters[3] * 3.6);
        color.brightness(filters[4] / 100);
        color.contrast(filters[5] / 100);

        const colorHSL = color.hsl();
        return (
            Math.abs(color.r - this.target.r) +
            Math.abs(color.g - this.target.g) +
            Math.abs(color.b - this.target.b) +
            Math.abs(colorHSL.h - this.targetHSL.h) +
            Math.abs(colorHSL.s - this.targetHSL.s) +
            Math.abs(colorHSL.l - this.targetHSL.l)
        );
    }

    css(filters) {
        function fmt(idx, multiplier = 1) {
            return Math.round(filters[idx] * multiplier);
        }
        return `invert(${fmt(0)}%) sepia(${fmt(1)}%) saturate(${fmt(2)}%) hue-rotate(${fmt(3, 3.6)}deg) brightness(${fmt(4)}%) contrast(${fmt(5)}%)`;
    }
}

let appThemes = {
    "darkBlue"             :   { "color": "#24364d", "contrastFontColor":"#FFFFFF"},
    //"forestGreen"       :   { "color": "#228B22", "contrastFontColor":"#FFFFFF"},
    //"blueViolet"        :   { "color": "#8A2BE2", "contrastFontColor":"#000000"},
    "lightSeaGreen"     :   { "color": "#20B2AA", "contrastFontColor":"#FFFFFF"},
    //"lightSkyBlue"      :   { "color": "#87CEFA", "contrastFontColor":"#000000"},
    //"lightBlue"         :   { "color": "#7aabba", "contrastFontColor":"#FFFFFF"},
    //"royalBlue"         :   { "color": "#4169E1", "contrastFontColor":"#FFFFFF"},
    "darkSeaGreen"      :   { "color": "#8FBC8F", "contrastFontColor":"#000000"},
    "cadetBlue"         :   { "color": "#5f9ea0", "contrastFontColor":"#FFFFFF"},
    //"crimson"           :   { "color": "#DC143C", "contrastFontColor":"#000000"},
    //"yellow"            :   { "color": "#FFFF00", "contrastFontColor":"#000000"},
    "teal"            	:   { "color": "#008080", "contrastFontColor":"#FFFFFF"},
};


// createThemeColorsJSON();
// export default function AppThemes(props){
//     const dispatch = useDispatch();
//     const currentThemeState = 'darkBlue';
//     /*let themeName;
//     let classList = document.querySelector("body").classList;
//     classList.forEach(function(className) {
//         if (className.includes("theme-")) {
//             themeName = className.replace("theme-", "");
//         }
//     });*/
//     let themeButtonsElements = [];
//     for (let themeKey in window.themeColors) {
//         let currentThemeAlreadySet = (currentThemeState === themeKey) ? "selected-theme": "";
//         themeButtonsElements.push(
//             (
//                 <button className={`btn btn-theme-${themeKey} btn-circle d-flex align-items-center justify-content-center m-2 ${currentThemeAlreadySet}`}
//                         id={`${themeKey}_apply_button`}
//                         onClick={()=>{dispatch(setAppTheme({"theme": themeKey}))}}
//                 >
//                     <span className="material-icons">insert_emoticon</span>
//                 </button>
//             )
//         );
//     }

//     return <>
//         {themeButtonsElements}
//     </>;

// }