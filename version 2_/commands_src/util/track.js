const ngdata = require('../../schemas/config');
const ngblade = require('../../schemas/ngblade');
const mongoose = require('mongoose');
const get = require('node-fetch2');

module.exports = async (Discord, client, msg, args) => {
    let types = {
        p: 'player',
        g: 'guild',
        gm: 'guildmember'
    }
    if (!args.length) return "No type specified\n- `player`\n- `guild`\n- `guildmember`";
    args[0] = args[0].toLowerCase()
    if (!['guild', 'player', 'guildmember', 'p', 'g', 'gm'].includes(args[0])) return `Theres no type \`${args[0]}\`\n- \`player\`\n- \`guild\`\n- \`guildmember\``;
    if (!args[1]) return "No name specified";
    if (['p', 'g', 'gm'].includes(args[0])) args[0] = types[args[0]];
    let tracked;

    let data = await ngdata.findOne({ title: "NetherBlade" });
    if (!data) return "Database not found, try again later";
    let gmlbw = [];

    if (args[0].toLowerCase() != 'guildmember') {
        let req = await get(`https://api.ngmc.co/v1/${args[0]}s/${args.slice(1).join('%20').replace(/ +/g, '%20')}?withStats=false&withVoteStatus=false&withFactionData=false&withPunishments=false&withWarnings=false`, { headers: { "Authorization": client.ngKey } }).catch(console.log)
        if (!req) return `Unable to fetch the ${args[0]}`;
        if (req.status >= 400) {
            if (req.status == 404) return `${args[0][0].toLowerCase() + args[0].slice(1).toLowerCase()} not found: ${args.slice(1).join(' ')}`;
            if (req.status == 429) { console.log('Failed to fetch: Status 429'); return `You are being rate limited` }
            if (req.status == 522) return `Connection to the NG API Timed out, try again later.`
            if ([521, 503].includes(req.status)) return `The API is currently offline, please try again later.`
            else return `Status ${req.status}: ${req.statusText}`;
        };
        req = await req.json();
        tracked = args[0] == 'player' ? `${req.xuid} (${req.name})` : `${req.id} (${req.name})`;
        if (data.fetch[`${args[0]}s`].includes(args[0] == 'player' ? req.xuid : req.name)) return `That ${args[0]} is already being tracked!`
        data.fetch[`${args[0]}s`].push(args[0] == 'player' ? req.xuid : req.id);
        data.counters[`${args[0]}s`]++;
        gmlbw.push({
            insertOne: {
                document: {
                    _id: mongoose.Types.ObjectId(),
                    id: args[0].toLowerCase() == 'player' ? req.xuid : req.id,
                    data: []
                }
            }
        })
    } else {
        let req = await get(`https://api.ngmc.co/v1/guilds/${args.slice(1).join('%20').replace(/ +/g, '%20')}?expand=true`, { headers: { "Authorization": client.ngKey } }).catch(console.log);
        if (!req) return `Unable to fetch the Guild`;
        if (req.status >= 400) {
            if (req.status == 404) return `<:erroro:1001073206389649408> Guild not found: ${args.slice(1).join(' ')}`;
            if (req.status == 429) { console.log('Failed to fetch: Status 429'); return `You are being rate limited` }
            if (req.status == 522) return `Connection to the NG API Timed out, try again later.`
            if ([521, 503].includes(req.status)) return `The API is currently offline, please try again later.`
            else return `Status ${req.status}: ${req.statusText}`;
        };
        req = await req.json();
        let guildmemberList = req.members.concat(req.officers);
        if (req.leader) guildmemberList.push(req.leader);

        let dup = 0;
        let added = 0;

        await new Promise((resolve, reject) => {
            guildmemberList.forEach((m, i) => {
                if (data.fetch.players.includes(m.xuid)) dup++;
                else {
                    data.fetch.players.push(m.xuid);
                    data.counters.players++;
                    gmlbw.push({
                        insertOne: {
                            document: {
                                _id: mongoose.Types.ObjectId(),
                                id: m.xuid,
                                data: []
                            }
                        }
                    })
                    added++
                };
                if (i == guildmemberList.length - 1) resolve();
            })
        });
        tracked = `${added} players (${dup} duplicates)`;
    }

    await ngblade.bulkWrite(gmlbw)

    await data.updateOne({
        counters: data.counters,
        fetch: data.fetch
    }, {
        upsert: true
    });

    return `Now tracking **${tracked}**`
}