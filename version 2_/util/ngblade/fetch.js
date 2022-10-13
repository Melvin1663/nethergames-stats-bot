const get = require('node-fetch2');
const divArrays = require('../../functions/divideArrays');
const hhmmss = require('hhmmss');
const xpToLvl = require('../../functions/xpToLvl');
const ngblade = require('../../schemas/ngblade');

module.exports = async (client, ngdata) => {
    let fetchedPlayers = 0;
    let fetchedGuilds = 0;
    let divData = {};
    [/*'players',*/ 'guilds'].forEach(x => {
        divData[x] = divArrays(ngdata.fetch[x], 100);
    });

    let doc = {
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }),
        timestamp: Date.now()
    };

    let bulkWriteParam = [];

    const fetchPlayers = async (players100) => {
        await new Promise(async (resolve, reject) => {
            let i = -1;
            for await (const a of players100) {
                // await new Promise((resolve2, reject2) => {
                //     setTimeout(() => resolve2(), 1500);
                // })
                i++;
                let players = await get('https://api.ngmc.co/v1/players/batch', {
                    headers: {
                        "Authorization": client.ngKey,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        names: a,
                        withVoteStatus: false,
                        withFactionData: false,
                        withPunishments: false,
                        withWarnings: false
                    }),
                    method: 'POST'
                });

                if (!players) console.log(`Fetch error while fetching players batch ${i}`);
                if (players.status >= 400) {
                    if (players.status == 404) console.log(`Player not found: ${args.join(' ')}. Players batch ${i}`);
                    if (players.status == 429) console.log(`Failed to fetch: Status 429 Players batch ${i}`);
                    if (players.status == 522) console.log(`Connection to the NG API Timed out, try again later. Players batch ${i}`)
                    if (players.status == 503) console.log(`The API is currently offline, please try again later. Players batch ${i}`)
                    else console.log(`Status ${players.status}: ${players.statusText} for players batch ${i}`);

                    await fetchPlayers(divData.players.slice(i));
                    return resolve();
                } else {
                    players = await players.json();
                    await new Promise((resolve1, reject1) => {
                        players.forEach((s, k) => {
                            let d = {
                                updateOne: {
                                    filter: { id: s.xuid },
                                    update: {
                                        $push: {
                                            data: {
                                                time: doc.timestamp,
                                                date: doc.date,
                                                name: s.name,
                                                credits: s.credits,
                                                xp: s.xp,
                                                kills: s.kills,
                                                deaths: s.deaths,
                                                wins: s.wins,
                                                losses: s.losses
                                            }
                                        }
                                    }
                                }
                            };
                            bulkWriteParam.push(d);
                            fetchedPlayers++;
                            if (k == players.length - 1) resolve1();
                        });
                    })
                    if (i == players100.length - 1) resolve();
                }
            }
        })
    }

    const fetchGuilds = async (guilds100) => {
        await new Promise(async (resolve, reject) => {
            let i = -1;
            for await (const a of guilds100) {
                // await new Promise((resolve2, reject2) => {
                //     setTimeout(() => resolve2(), 1500);
                // })
                i++;
                let guilds = await get('https://api.ngmc.co/v1/guilds/batch', {
                    headers: {
                        "Authorization": client.ngKey,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ names: a }),
                    method: 'POST'
                });

                if (!guilds) console.log(`Fetch error while fetching guilds batch ${i}`);
                if (guilds.status >= 400) {
                    if (guilds.status == 404) console.log(`<:erroro:1001073206389649408> Guild not found: ${args.join(' ')}. Guilds batch ${i}`);
                    if (guilds.status == 429) console.log(`Failed to fetch: Status 429. Guilds batch ${i}`);
                    if (guilds.status == 522) console.log(`Connection to the NG API Timed out, try again later. Guilds batch ${i}`)
                    if (guilds.status == 503) console.log(`The API is currently offline, please try again later. Guilds batch ${i}`)
                    else console.log(`Status ${guilds.status}: ${guilds.statusText} for guilds batch ${i}`);

                    await fetchGuilds(divData.guilds.slice(i));
                    return resolve();
                } else {
                    guilds = await guilds.json();
                    new Promise((resolve1, reject1) => {
                        guilds.forEach((s, k) => {
                            if (s) {
                                let d = {
                                    updateOne: {
                                        filter: { id: s.id },
                                        update: {
                                            $push: {
                                                data: {
                                                    time: doc.timestamp,
                                                    date: doc.date,
                                                    name: s.name,
                                                    mbc: s.memberCount,
                                                    xp: s.xp,
                                                    pos: s.position
                                                }
                                            }
                                        }
                                    }
    
                                };
                                bulkWriteParam.push(d);
                                fetchedGuilds++;
                            }
                            
                            if (k == guilds.length - 1) resolve1();
                        })
                    })
                    if (i == guilds100.length - 1) resolve();
                }
            }
        })
    }

    // await fetchPlayers(divData.players);
    await fetchGuilds(divData.guilds);

    let newNext = new Date(new Date(ngdata.next).getTime() + 86400000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });

    await ngblade.bulkWrite(bulkWriteParam);
    await ngdata.updateOne({ next: newNext });

    client.channels.fetch('956719837705556068').then(c =>
        c.send(`⬆️ Fetched \`${fetchedPlayers}/${ngdata.counters.players}\` players and \`${fetchedGuilds}/${ngdata.counters.guilds}\` guilds`).catch(console.log)
    ).catch(() => console.log('[X] NGBlade message not sent.'))

    console.log(`Finished Updating NG Blade (${fetchedPlayers} Players and ${fetchedGuilds} Guilds)`);
    setTimeout(() => {
        require('./fetch')(client, ngdata);
    }, new Date(newNext).getTime() - Date.now())
    console.log(`Time left to fetch: ${hhmmss(~~((new Date(newNext).getTime() - Date.now()) / 1000))}`)
}