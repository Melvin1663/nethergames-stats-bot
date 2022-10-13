/**
 * @param {array} array The array to remove a specific element from
 * @param {any} element The element you would like to remove from the array
 * @returns The array without the element
 */
module.exports = (array, element) => {
    let result = [];
    array.forEach(v => v == element ? {} : result.push(v));
    return result;
}