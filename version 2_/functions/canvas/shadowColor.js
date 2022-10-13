// module.exports = (hex, Darkness) => {//string, int
//     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     var rgb = result ? {
//         r: parseInt(result[1], 16),
//         g: parseInt(result[2], 16),
//         b: parseInt(result[3], 16)
//     } : null; //hex -> rgb

//     rgb.r = rgb.r - Darkness;
//     rgb.g = rgb.g - Darkness;
//     rgb.b = rgb.b - Darkness;//apply darkness value

//     var rgb_h_r = rgb.r.toString(16).length == 1 ? "0" + rgb.r.toString(16) : rgb.g.toString(16);

//     var rgb_h_g = rgb.g.toString(16).length == 1 ? "0" + rgb.g.toString(16) : rgb.g.toString(16);

//     var rgb_h_b = rgb.b.toString(16).length == 1 ? "0" + rgb.b.toString(16) : rgb.b.toString(16);//convert back to hex

//     return "#" + rgb_h_r + rgb_h_g + rgb_h_b;//return the new hex value
// }

/**
 * @param {string} hex Hex Code
 * @param {number} l Light level
 * @returns hex
 */

module.exports = (hex, l) => {
    let hsl = require('../hexToHSL')(hex);
    hsl[2] = l;
    return require('../HSLToHex')(...hsl);
}