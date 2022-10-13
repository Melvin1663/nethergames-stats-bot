const get = require('node-fetch2');

module.exports = async (client) => {
    let types = [
        { type: 'credits', limit: 500 },
        { type: 'kdr', limit: 500 },
        { type: 'wlr', limit: 500 },
        { type: 'kills', limit: 500 },
        { type: 'parkour', limit: 500 },
        { type: 'voters', limit: 500 },
        { type: 'wins', limit: 500 },
        { type: 'xp', limit: 500 },
    ]

    let lbTypes = [
        'credits',
        'kdr',
        'wlr',
        'kills',
        'parkour',
        'voters',
        'wins',
        'xp',
    ]

    let lb = await get(`https://api.ngmc.co/v1/leaderboard/bulk`, {
        headers: {
            "Authorization": client.ngKey,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(types)
    }).catch(console.log);

    if (!lb) return console.log(`Unable to fetch leaderboards`);
    else if (lb.status != 200) {
        return console.log(`Status ${lb.status} while fetching Leaderboards`)
    } else lb = await lb.json();

    lb.forEach((l, i) => {
        client.leaderboards[lbTypes[i]] = l;
    })

    client.leaderboards.timestamp = Date.now()
}
