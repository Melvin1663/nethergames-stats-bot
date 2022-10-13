const interpolate = (x, y, z) => {
    let int = (z - x) / y;
    let arr = [];
    for (i = 1; i <= y; i++) arr.push(x + int * i);
    arr.unshift(x);
    return arr;
}

module.exports = (array) => {
    let res = [];
    let gaps = [];

    let isEmpty = false;
    let memory = 0;

    array.forEach((x, i) => {
        if (x == 0 || x) {
            gaps.push(array.slice(memory, i + 1))
            isEmpty = false;
            memory = 0;
        }
        if (x == 0 || x && isEmpty == false) { memory = i };
        if (!x && x != 0 && isEmpty == false) { isEmpty = true; memory = i - 1 }
    });

    gaps = gaps.splice(1);

    gaps.forEach((gap, i) => {
        if (gap.length == 2) {
            i == 0 ? null : gap = gap.splice(1);
            return res.push(...gap);
        };

        let interpolated = interpolate(gap[0], gap.length - 1, gap[gap.length - 1]);

        i == 0 ? null : interpolated = interpolated.splice(1);

        res.push(...interpolated);
    });

    return res;
}