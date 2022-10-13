module.exports = (flags) => {
    // NONE = 0,
    // HAS_VIP = 1 << 0,
    // HIDE_SKIN = 1 << 2,
    // HIDE_LAST_SERVER = 1 << 3,
    // QUARANTINE = 1 << 4,
    // Source by casper

    let vals = {
        none: 0,
        vip: 1 << 0,
        hideSkin: 1 << 2,
        hideLastServer: 1 << 3,
        quarantine: 1 << 4
    }

    let result = {
        none: false,
        vip: false,
        hideSkin: false,
        hideLastServer: false,
        quarantine: false
    }

    Object.keys(vals).forEach(i => {
        if ((flags & vals[i]) == vals[i]) result[i] = true
    })

    if (!Object.values(result).slice(1).includes(true)) result.none = true;
    else result.none = false;

    return result;
}