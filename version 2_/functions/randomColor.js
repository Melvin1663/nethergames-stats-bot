module.exports = (type) => {
    let res = [];
    if (type == 'rgb') for (i = 0; i < 3; i++) res.push(~~(Math.random() * 255));
    else for (i = 0; i < 4; i++) res.push(i != 3 ? ~~(Math.random() * 255) : 2);

    return res;
}