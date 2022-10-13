/**
 * @param {number} i Time in seconds
 * @param {number} len 0 = Short | 1 = Long
 * @param {number} first Show first # time measurements
 * @param {string} numC Color of the numbers with Minecraft Markdown
 * @param {string} keyC Color of letters with Minecraft Markdown
 * @param {string} join Character to join all the shortened time
 * @returns Formatted time (#y#mo#h#m#s)
 */
 module.exports = (i, len, first, numC, keyC, join) => {
    i = Number(i);
    var y = Math.floor(((i / 86400) / 365.2425) % 365.2425);
    var mo = Math.floor(((i / 86400) / 30.4167) % 12);
    var d = Math.floor(i / 86400 % 30.4167);
    var h = Math.floor(i / 3600 % 24);
    var m = Math.floor(i % 3600 / 60);
    var s = Math.floor(i % 3600 % 60);

    let result = [];

    if (!numC) numC = '§r';
    if (!keyC) keyC = '§r';

    var yDisplay = y > 0 ? result.push(numC + y + (len ? `${keyC}y` : `${keyC}years`)) : '';
    var moDisplay = mo > 0 ? result.push(numC + mo + (len ? `${keyC}mo` : `${keyC}months`)) : '';
    var dDisplay = d > 0 ? result.push(numC + d + (len ? `${keyC}d` : `${keyC}days`)) : '';
    var hDisplay = h > 0 ? result.push(numC + h + (len ? `${keyC}h` : `${keyC}hours`)) : '';
    var mDisplay = m > 0 ? result.push(numC + m + (len ? `${keyC}m` : `${keyC}minutes`)) : '';
    var sDisplay = s > 0 ? result.push(numC + s + (len ? `${keyC}s` : `${keyC}seconds`)) : '';
    if (s == 0 && !h && !m && !d && !mo && !y) result.push(`${numC}0${keyC}s`);

    // return yDisplay + moDisplay + dDisplay + hDisplay + mDisplay + sDisplay;
    if (first) return result.slice(0, first).join(join || '')
    return result.slice(first || 0).join(join || '')
}