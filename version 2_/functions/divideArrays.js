// This is nothing :p

module.exports = (a, n) => {
    let x = n;
    let res = [];
    for (i = 0; i < a.length; i += n) {
        res.push(a.slice(i, x));
        x += n
    };

    return res;
}