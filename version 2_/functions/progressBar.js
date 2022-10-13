module.exports = (barEmpty1, barEmpty2, barEmpty3, barFill1, barFill2, barFill3, pos, max) => {
    if (pos <= 0) pos = 0
    if (max > 1000) return "Max Cells is 1000"
    let bar = [];
    pos = ~~pos
    for (let i = 0; i < max; i++) {
        if (pos >= max) {
            if (i == 0) bar.push(barFill1)
            else if (i >= 1 && i < pos - 1) bar.push(barFill2)
            else if (i == pos - 1) bar.push(barFill3)
        } else if (i < pos) {
            if (i == 0) bar.push(barFill1)
            else if (i >= 1 && i < pos && pos != max) bar.push(barFill2)
            else if (i == max - 1) bar.push(barFill3)
        } else {
            if (i == 0) bar.push(barEmpty1)
            else if (i >= 1 && i < max - 1) bar.push(barEmpty2)
            else if (i == max - 1) bar.push(barEmpty3)
        }
    }

    return bar.join('')
}