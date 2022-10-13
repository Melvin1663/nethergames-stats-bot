module.exports = (xp) => {
    if (xp > 1395) return (Math.sqrt(72 * xp - 54215) + 325) / 18;
    if (xp > 315) return Math.sqrt(40 * xp - 7839) / 10 + 8.1;
    if (xp > 0) return Math.sqrt(xp + 9) - 3;
    return 0;
}