const get = require('node-fetch');

module.exports = async (Discord, client, args) => {
    let a = 0
    let err

    let res = await get(`https://apiv2.nethergames.org/v1/servers`, { headers: { "Authorization": client.ngKey } }).catch(e => {
        if (e.message != 'Response code 404 (Not Found)') console.log(e);
        err = e.message
    })

    if (res?.status != 200) return `Error ${res.status}: ${res.statusText}`

    res = await res.json();

    setTimeout(() => {
        if (!res && a == 0) return 'Error: Request Timed Out'
    }, 5000)

    if (!res && err) {
        a++
        return `Error: ${err}`
    } else if (!res && !err) {
        a++
        return 'Error: Unknown Error'
    }

    if (['bw', 'bed', 'bedwars'].includes(args.join('').toLowerCase())) {
        return require('../../nethergames_servers/bedwars')(client, args, Discord, res)
    } else if (args.join('').toLowerCase().includes('creative')) {
        return require('../../nethergames_servers/creative.js')(client, args, Discord, res)
    } else if (['duel', 'duels'].includes(args.join('').toLowerCase())) {
        return require('../../nethergames_servers/duels.js')(client, args, Discord, res)
    } else if (['factions', 'faction', 'f'].includes(args.join('').toLowerCase())) {
        return require('../../nethergames_servers/factions.js')(client, args, Discord, res)
    } else if (['build', 'buildbattle', 'bb'].includes(args.join('').toLowerCase())) {
        return require('../../nethergames_servers/buildbattle.js')(client, args, Discord, res)
    } else if (['blockhunt', 'block', 'hunt', 'bh'].includes(args.join('').toLowerCase())) {
        return require('../../nethergames_servers/blockhunt.js')(client, args, Discord, res)
    } else if (['royale', 'battleyoyale', 'br'].includes(args.join('').toLowerCase())) {
        return require('../../nethergames_servers/battleRoyale.js')(client, args, Discord, res)
    } else if (['ctf', 'capture', 'flag', 'capturetheflag', 'capturethe', 'theflag'].includes(args.join('').toLowerCase())) {
        return require('../../nethergames_servers/captureTheFlag.js')(client, args, Discord, res)
    } else if (['lobby', 'lobbies', 'lb'].includes(args.join('').toLowerCase())) {
        return require('../../nethergames_servers/lobby.js')(client, args, Discord, res)
    } else if (['mm', 'murdermystery', 'murder', 'mystery'].includes(args.join('').toLowerCase())) {
        return require('../../nethergames_servers/murderMystery.js')(client, args, Discord, res)
    } else if (['ms', 'momma', 'says', 'momma says'].includes(args.join('').toLowerCase())) {
        return require('../../nethergames_servers/mommaSays.js')(client, args, Discord, res)
    } else if (['replay', 'r'].includes(args.join('').toLowerCase())) {
        return require('../../nethergames_servers/replay.js')(client, args, Discord, res)
    } else if (['survival', 'sg', 'survivalgames'].includes(args.join('').toLowerCase())) {
        return require('../../nethergames_servers/survivalGames.js')(client, args, Discord, res)
    } else if (['skywars', 'sw', 'sky'].includes(args.join('').toLowerCase())) {
        return require('../../nethergames_servers/skyWars.js')(client, args, Discord, res)
    } else if (['thebridge', 'tb', 'bridge'].includes(args.join('').toLowerCase())) {
        return require('../../nethergames_servers/theBridge.js')(client, args, Discord, res)
    } else if (['uhc', 'ultrahardcore', 'hardcore'].includes(args.join('').toLowerCase())) {
        return require('../../nethergames_servers/uhc.js')(client, args, Discord, res)
    } else if (['tnt', 'run', 'tntrun'].includes(args.join('').toLowerCase())) {
        return require('../../nethergames_servers/tntRun.js')(client, args, Discord, res)
    }

    else {
        return require('../../nethergames_servers/all.js')(client, args, Discord, res)
    }
}