module.exports = (p) => {
    if (!p) return { txt: 'Player not found' };
    if (!p.extraNested) return { txt: 'Data not found' };

    const metaData = {
        AC: "Arcade",
        BB: "Build Battle",
        Beta: "Beta",
        BH: "Block Hunt",
        BR: "Battle Royale",
        BW: "Bedwars",
        CQ: "Conquests",
        Creative: "Creative",
        CTF: "Capture the Flag",
        DUELS: "Duels",
        Factions: "Factions",
        Lobby: "Lobby",
        MM: "Murder Mystery",
        MS: "Momma Says",
        RC: "Races",
        Replay: "Replay",
        SB: "Skyblock",
        SC: "Soccer",
        SG: "Survival Games",
        SP: "Spleef",
        SW: "SkyWars",
        TB: "The Bridge",
        TR: "TNT Run",
        UHC: "UHC",
    }

    let res = {
        data: {},
        string: ''
    }

    let codes = [];

    let sub_wins = [];
    let sub_losses = [];

    for (const game in p.extraNested) {
        if (p.extraNested[game].wins && p.extraNested[game].losses && metaData[game.toUpperCase()]) {
            codes.push(game)
            res.data[game] = `(${(!p.extraNested[game].losses ? 0 : p.extraNested[game].wins / p.extraNested[game].losses)?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}) ${(!p.extraNested[game].losses ? 0 : p.extraNested[game].wins / p.extraNested[game].losses).toLocaleString('en-US', { minimumFractionDigits: 5, maximumFractionDigits: 5 })}`
        }
    }

    ['Wins', 'Losses'].forEach(l => {
        codes.forEach(c => {
            let filtered = Object.keys(p.extra).filter(v => v.startsWith(c) && v.includes(l))
            let entries = [];
            filtered.forEach(f => {
                if (f.slice(c.length) === l) return;
                else entries.push({ code: c.toLowerCase(), value: f.slice(c.length).replace(l, '') })
            })
            entries.forEach(e => {
                if (p.extra[`${e.code}${e.value}${l}`] > 0) l == 'Wins' ? sub_wins.push(e) : sub_losses.push(e);
            })
        })
    })

    let sub_kdr = require('./intersect')(sub_losses, sub_wins, true);

    for (let i in res.data) {
        res.string += `**${metaData[i.toUpperCase()]}:** ${res.data[i]}\n`;
        if (sub_kdr.filter(e => e.code == i.toLowerCase()).length > 0) {
            res.string += `${sub_kdr.filter(e => e.code == i.toLowerCase()).map(v => `<:reply:896727153780068352> **${v.value}:** (${(!p.extra[`${v.code}${v.value}Losses`] ? 0 : p.extra[`${v.code}${v.value}Wins`] / p.extra[`${v.code}${v.value}Losses`])?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}) ${(!p.extra[`${v.code}${v.value}Losses`] ? 0 : p.extra[`${v.code}${v.value}Wins`] / p.extra[`${v.code}${v.value}Losses`])?.toLocaleString('en-US', { minimumFractionDigits: 5, maximumFractionDigits: 5 })}`).join('\n')}\n`
        }
    }

    return res;
}