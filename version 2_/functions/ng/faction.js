const get = require('node-fetch2');
const client = require('../../index');

/** 
 * @param {string} faction The name of the faction
 * @default expand false
 * @default withStats false
 * @default withVoteStatus false
 * @default withFactionData false
 * @default withPunishments false
 * @default withWarnings false
 * @param {boolean} expand Include per player data
 * @param {boolean} withStats Include Player stats
 * @param {boolean} withVoteStatus Include Player vote status
 * @param {boolean} withFactionData Include Player Faction Data
 * @param {boolean} withPunishments Include Player Punishments Data
 * @param {boolean} withWarnings Include Player Warnings Data
 * @returns {object} Data for a Faction in NetherGames
*/
module.exports = async (faction, expand, withStats, withVoteStatus, withFactionData, withPunishments, withWarnings) => {
    let queryString = '?a=0';
    let queries = { expand, withStats, withVoteStatus, withFactionData, withPunishments, withWarnings };
    for (q in queries) queryString += `&${q}=${queries[q] == undefined ? false : queries[q]}`;

    let res = await get(`https://api.ngmc.co/v1/factions/${faction}${queryString}`, { headers: { "Authorization": client.ngKey } }).catch(console.log)
    if (!res) return { code: 400, msg: "Unable to fetch the faction" };
    if (res.status >= 400) {
        if (res.status == 404) return { code: 404, msg: `Faction not found: ${faction}` };
        if (res.status == 429) { console.log('Failed to fetch: Status 429'); return { code: 429, msg: `You are being rate limited` } }
        if (res.status == 502) return { code: 502, msg: `Recieved an Invalid response from the server, please try again later.` }
        if (res.status == 522) return { code: 522, msg: `Connection to the NG API Timed out, try again later.` }
        if ([521, 503].includes(res.status)) return { code: res.status, msg: `The API is currently offline, please try again later.` }
        else return { code: res.status, msg: `Status ${res.status}: ${res.statusText}` };
    }

    res = await res.json();

    return { code: 0, json: res };
}