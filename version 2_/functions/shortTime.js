/**
 * @param {number} i Time in seconds
 * @returns Formatted time (#y#mo#h#m#s)
 */
module.exports = (i) => {
    i = Number(i);
    var y = Math.floor(((i / 86400) / 365.2425) % 365.2425);
    var mo = Math.floor(((i / 86400) / 30.4167) % 12);
    var d = Math.floor(i / 86400 % 30.4167);
    var h = Math.floor(i / 3600 % 24);
    var m = Math.floor(i % 3600 / 60);
    var s = Math.floor(i % 3600 % 60);

    var yDisplay = y > 0 ? y + 'y' : '';
    var moDisplay = mo > 0 ? mo + 'mo' : '';
    var dDisplay = d > 0 ? d + 'd' : '';
    var hDisplay = h > 0 ? h + 'h' : '';
    var mDisplay = m > 0 ? m + 'm' : '';
    var sDisplay = s > 0 ? s + 's' : '';
    if (s == 0 && !h && !m && !d && !mo && !y) sDisplay = '0s'
    return yDisplay + moDisplay + dDisplay + hDisplay + mDisplay + sDisplay;
}