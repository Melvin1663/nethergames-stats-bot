const get = require('node-fetch2');
const client = require('../../index');

/** 
 * @param {string} player The name of the player
 * @returns {object} Data for a Players Leaderboard Stats in NetherGames
*/
module.exports = async (player) => {
    let res = await get(`https://api.ngmc.co/v1/players/${player}/leaderboard`, { headers: { "Authorization": client.ngKey } }).catch(console.log)
    if (!res) return { code: 400, msg: "Unable to fetch the player" };
    if (res.status >= 400) {
        if (res.status == 404) return { code: 404, msg: `Player not found: ${player}` };
        if (res.status == 429) { console.log('Failed to fetch: Status 429'); return { code: 429, msg: `You are being rate limited` } }
        if (res.status == 502) return { code: 502, msg: `Recieved an Invalid response from the server, please try again later.` }
        if (res.status == 522) return { code: 522, msg: `Connection to the NG API Timed out, try again later.` }
        if ([521, 503].includes(res.status)) return { code: res.status, msg: `The API is currently offline, please try again later.` }
        else return { code: res.status, msg: `Status ${res.status}: ${res.statusText}` };
    }

    res = await res.json();

    return { code: 0, json: res };
}