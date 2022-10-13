/**
 * @default type 0 = First char
 * @param {string} string The string to uppercase
 * @param {number} type 0 = First char, 1 = First char of every word, 2 = All char
 * @returns {string} Uppercased String
 */
module.exports = (string, type) => {
    if (!type || ![0,1,2].includes(type)) type = 0;
    let res = '';

    switch (type) {
        case 0: res = string[0].toUpperCase() + string.slice(1).toLowerCase(); break;
        case 1: string.split(' ').forEach(w => res += `${require('./upper')(w)} `); break;
        case 2: res = string.toUpperCase(); break;
    }

    return res.trim();
}