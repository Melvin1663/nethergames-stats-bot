const get = require('node-fetch2');
const client = require('../../index');

/**
 * @default limit 100
 * @param {number} limit Max results
 * @param {string} type Leaderboard type
 * @param {string} column Leaderboard column for type game
 * @param {string} scope Leaderboard scope for type factions
 * @returns {object} The leaderboard for type
 */
module.exports = async (limit, type, column, scope) => {
    let queryString = '?a=0';
    if (scope) scope = scope.replace('beststreak', 'bestStreak')
    let queries = { limit, type, column, scope };
    if (type) {
        if (type != 'game') delete queries.column
        if (type == 'factions' && !scope) {
            delete queries.scope;
            delete queries.column;
        } else if (type != 'factions') delete queries.scope
    } else if (column && type == 'game') {
        delete queries.scope;
    } else if (scope && type == 'faction') {
        delete queries.column;
    }

    for (q in queries) queryString += `&${q}=${queries[q]}`;

    let res = await get(`https://api.ngmc.co/v1/leaderboard${queryString}`, { headers: { "Authorization": client.ngKey } }).catch(console.log)
    if (!res) return { code: 400, msg: "Unable to fetch the leaderboard" };
    if (res.status >= 400) {
        if (res.status == 404) return { code: 404, msg: `Leaderboard not found: ${player}` };
        if (res.status == 429) { console.log('Failed to fetch: Status 429'); return { code: 429, msg: `You are being rate limited` } }
        if (res.status == 502) return { code: 502, msg: `Recieved an Invalid response from the server, please try again later.` }
        if (res.status == 522) return { code: 522, msg: `Connection to the NG API Timed out, try again later.` }
        if ([521, 503].includes(res.status)) return { code: res.status, msg: `The API is currently offline, please try again later.` }
        else return { code: res.status, msg: `Status ${res.status}: ${res.statusText}` };
    }

    res = await res.json();

    return { code: 0, json: res };
}