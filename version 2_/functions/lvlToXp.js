module.exports = (lvl) => {
    if (lvl > 30) return 4.5 * lvl * lvl - 162.5 * lvl + 2220;
    if (lvl > 15) return 2.5 * lvl * lvl - 40.5 * lvl + 360;
    return lvl * lvl + 6 * lvl;
}