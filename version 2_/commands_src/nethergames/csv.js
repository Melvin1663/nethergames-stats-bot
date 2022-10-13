const ngblade = require('../../schemas/config');
const ngdata = require('../../schemas/ngblade');
const fs = require('fs');
const xpToLvl = require('../../functions/xpToLvl');
const pStatsHist = require('../../functions/ng/player stats history');

module.exports = async (Discord, client, msg, args) => {
    let table = {
        Date: ['Timestamp']
    }
    let types = {
        p: 'player',
        g: 'guild',
    }
    if (!args.length) return "<:warningo:1001073452385583215> No type specified\n- `player`\n- `guild`";
    if (!['guild', 'player', 'p', 'g'].includes(args[0].toLowerCase())) return `<:warningo:1001073452385583215> Theres no type \`${args[0].toLowerCase()}\`\n- \`player\`\n- \`guild\``;
    if (!args[1]) return "<:warningo:1001073452385583215> No name specified";
    if (['p', 'g'].includes(args[0].toLowerCase())) args[0] = types[args[0].toLowerCase()];
    args[0] = args[0].toLowerCase();

    let req;

    if (args[0] == 'player') {
        req = await require('../../functions/ng/player')(require('../../functions/deQ')(args.slice(1).join(' ')), { expand: false, withFactionData: false, withGuildData: false, withOnline: false, withPunishments: false, withSkinData: false, withStats: false, withVoteStatus: false });
        table.Date.push(...['Level', 'Credits', 'EXP', 'Kills', 'Deaths', 'K/DR', 'Wins', 'Losses', 'W/LR']);
    } else {
        req = await require('../../functions/ng/guild')(require('../../functions/deQ')(args.slice(1).join(' ')));
        table.Date.push(...['Member Count', 'EXP', 'Level', 'Position']);
    }
    if (req.code != 0) {
        if (req.code == 404) {
            let s = await require('../../functions/genButtons')(5, require('../../functions/deQ')(args.slice(1).join(' ')), args[0], 'csv', true);
            if (s.code == 0) {
                let resp = { content: `${require('../../functions/upper')(args[0])} not found: ${require('../../functions/deQ')(args.slice(1).join(' '))}` };
                if (s.json[0].components.length > 0) {
                    resp.content += '\n<:helpo:1001073741897408563> Do you mean: (Type it you lazy person)';
                    resp.components = s.json;
                };
                return resp;
            }
            return req.msg;
        } else return req.msg;
    };
    req = req.json;

    if (req.message) return `<:erroro:1001073206389649408> An Error Occured, try again later\n${req.message}`;
    let data = await ngdata.findOne({ id: args[0] == 'player' ? req.xuid : req.id });
    if (!data) return `<:warningo:1001073452385583215> ${require('../../functions/upper')(args[0])} not found in the Database`;
    let dataCount = 0;

    data.data.forEach(d => {
        table[`"${d.date}"`] = [d.time];
        if (args[0] == 'player') {
            table[`"${d.date}"`].push(...[xpToLvl(d.xp), d.credits, d.xp, d.kills, d.deaths, d.kills / d.deaths, d.wins, d.losses, d.wins / d.losses]);
            dataCount++;
        } else {
            table[`"${d.date}"`].push(...[d.mbc, d.xp, xpToLvl(d.xp), d.pos]);
            dataCount++;
        }
    })

    if (args[0] == 'player') {
        let res = await pStatsHist(require('../../functions/deQ')(args.slice(1).join(' ')), { periodStart: 0, hour: 0 });
        if (!res.code) for (day in res.json) {
            let date = '"' + new Date(+(day * 1000)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }) + '"';
            let d = res.json[day];
            table[date] = [day * 1000];
            table[date].push(...[xpToLvl(d.xp), d.credits, d.xp, d.kills, d.deaths, d.kills / d.deaths, d.wins.total, d.losses, d.wins.total / d.losses])
            dataCount++;
        }
    }

    if (dataCount == 0) return `<:warningo:1001073452385583215> No Data for ${args[0]} \`${req.name}\`, use \`ns!track\` to track their stats!`;

    let csvData = [];

    for (const k in table) {
        let arr = [];
        arr.push(k);
        arr.push(...table[k])
        csvData.push(arr);
    };

    csvData = csvData.map(v => v.join(','))

    fs.writeFileSync(process.cwd() + '/temp/sheet.csv', csvData.join('\n'))
    return {
        content: `${req.name}'s Data (Open with a spreadsheet app)`,
        files: [{
            attachment: process.cwd() + '/temp/sheet.csv',
            name: `${req.name}.csv`
        }]
    }
}
