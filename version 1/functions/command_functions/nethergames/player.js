const get = require("node-fetch");
const moment = require('moment');
const { create } = require('sourcebin');

module.exports = async (Discord, client, args) => {
    if (!args.length) return `Please specify a Player`;

    const colorCodes = {
        '§4': '<:darkred:872103440128565299>',
        '§c': '<:red:872103439839154207>',
        '§6': '<:gold:872103440099196979>',
        '§e': '<:yellow:872103439985963039>',
        '§2': '<:darkgreen:872103440426340384>',
        '§a': '<:green:872103439780413531>',
        '§b': '<:aqua:872103439981756436>',
        '§3': '<:darkaqua:872103439914651709>',
        '§1': '<:darkblue:872103440023687198>',
        '§9': '<:blue:872103439952392222>',
        '§d': '<:lightpurple:872103440329871390>',
        '§5': '<:darkpurple:872103439918858240>',
        '§f': '<:white:872103439914663996>',
        '§7': '<:grey:872103439763656745>',
        '§8': '<:darkgray:872103439809773679>',
        '§0': '<:black:872103439793029191>'
    }
    let a = 0
    const data = {}
    const online = 'http://www.clker.com/cliparts/1/5/4/b/11949892282132520602led_circle_green.svg.hi.png'
    const offline = 'http://www.clker.com/cliparts/5/7/b/5/1194989231691813435led_circle_red.svg.hi.png'
    let err
    let res = await get(`https://apiv2.nethergames.org/v1/players/${args.join('%20')}`, { headers: { "Authorization": client.ngKey } }).catch(e => {
        if (e.message != 'Response code 404 (Not Found)') console.log(e);
        err = e.message
    })

    if (res?.status != 200) return `Error ${res.status}: ${res.statusText}`

    res = await res.json();

    setTimeout(() => {
        if (!res && a == 0) return 'Error: Request Timed Out';
    }, 5000)

    if (!res && err) {
        a++
        return `Error: ${err}`
    } else if (!res && !err) {
        a++
        return 'Error: Unknown Error'
    }

    if (res.message == 'Unknown player') return 'Error: Unknown Player'

    const metaData = {
        AC: 'Arcade',
        BB: 'Build Battle',
        Beta: 'Beta',
        BH: 'Block Hunt',
        BR: 'Battle Royale',
        BW: 'Bedwars',
        Creative: 'Creative',
        CTF: 'Capture the Flag',
        Duels: 'Duels',
        Factions: 'Factions',
        Lobby: 'Lobby',
        MM: 'Murder Mystery',
        MS: 'Momma Says',
        RC: 'Races',
        Replay: 'Replay',
        SB: 'Skyblock',
        SC: 'Soccer',
        SG: 'Survival Games',
        SP: 'Spleef',
        SW: 'SkyWars',
        TB: 'The Bridge',
        TR: 'TNT Run',
        UHC: 'UHC'
      }
    const meta = []
    const metaData_lowerCase = {}
    Object.keys(metaData).forEach(i => meta.push(i.toLowerCase()))
    for (let i in metaData) {
        metaData_lowerCase[i.toLowerCase()] = metaData[i]
    }

    if (args[args.length - 1].startsWith('?') && args.length > 1) {
        let game = args[args.length - 1].slice(1)
        let info_av_games = []
        let avGame = ['bb', 'bh', 'br', 'bw', 'ctf', 'duels', 'mm', 'ms', 'rc', 'sc', 'sg', 'sw', 'tb', 'tr']
        avGame.forEach(i => {
            if (meta.includes(i)) info_av_games.push(`\`${i}\` - ${metaData_lowerCase[i]}`)
        })
        if (!avGame.includes(game)) return `Error: No Data for Game Code \`${game.toUpperCase()}\`\n\nPerhaps you did a typo?\n${info_av_games.join('\n')}`
        return require(`../../nethergames_gameStats/${game}`)(client, args, Discord, res, online, offline)
    } else {
        try {
            data.name = !res.name ? 'N/A' : res.name
            data.icon = `https://player.nethergames.org/avatar/${encodeURIComponent(data.name)}`
            data.bio = !res.bio ? 'N/A' : (res.bio.length > 1020 ? `${res.bio.substring(0, 1020)}...` : res.bio)
            data.guild = !res.guild ? 'N/A' : `[${res.guild}](https://portal.nethergames.org/guild/${encodeURIComponent(res.guild)})`
            data.level = !res.level ? '0' : res.level.toLocaleString()
            data.vote = 'N/A'
            data.online = !res.online ? 'N/A' : res.online
            data.credits = !res.statusCredits ? '0' : res.statusCredits.toLocaleString()
            data.xp = !res.xp ? '0' : res.xp.toLocaleString()
            data.ranks = !res.ranks.length ? 'N/A' : res.ranks.join(', ')
            data.tier = !res.tier ? 'N/A' : res.tier
            data.deaths = !res.deaths ? '0' : res.deaths.toLocaleString()
            data.kills = !res.kills ? '0' : res.kills.toLocaleString()
            data.wins = !res.wins ? '0' : res.wins.toLocaleString()
            data.losses = !res.losses ? '0' : res.losses.toLocaleString()
            data.joined = !res.firstJoin ? 'N/A' : moment(res.firstJoin).valueOf().toString().slice(0, -3)
            data.lastJoin = !res.lastJoin ? 'N/A' : moment(res.lastJoin).valueOf().toString().slice(0, -3)
            data.lastSeen = !res.lastSeen ? 'N/A' : res.lastSeen
            data.lastServer = !res.lastServer ? 'N/A' : res.lastServer
            data.punishments = !res.punishments ? 'N/A' : res.punishments.length
            data.warnings = !res.warnings ? 'N/A' : res.warnings.length
            data.tag = 'N/A'
            data.winsData = []
            data.warningsArr = []
            data.punishmentsArr = []
            data.guildTagColor = '';
            data.xuid = !res.xuid ? 'N/A' : res.xuid;

            let punishmentURL = { url: '' }
            let warnsURL = { url: '' }

            switch (res.voteStatus) {
                case 0:
                    data.vote = 'Not Voted'; break;
                case 1:
                    data.vote = 'Unclaimed Vote'; break;
                case 2:
                    data.vote = 'Claimed Vote'; break;
                default:
                    data.vote = 'N/A'
            }

            if (data.guild != 'N/A') {
                const pGuild = await get(`https://apiv2.nethergames.org/v1/guilds/${encodeURIComponent(res.guild)}`, { headers: { "Authorization": client.ngKey } }).then(r => r.json()).catch(e => console.log(e))
                if (!pGuild) data.tag = res.guild
                else {
                    data.tag = !pGuild.tag ? 'N/A' : pGuild.tag
                    data.guildTagColor = pGuild.rawTag?.startsWith('Â') ? colorCodes[pGuild.rawTag?.slice(1, pGuild.rawTag?.length - data.tag.length)] : ''
                }
            }

            const wins = res.winsData

            let metaData = {
                AC: 'Arcade',
                BB: 'Build Battle',
                Beta: 'Beta',
                BH: 'Block Hunt',
                BR: 'Battle Royale',
                BW: 'Bedwars',
                Creative: 'Creative',
                CTF: 'Capture the Flag',
                Duels: 'Duels',
                Factions: 'Factions',
                Lobby: 'Lobby',
                MM: 'Murder Mystery',
                MS: 'Momma Says',
                RC: 'Races',
                Replay: 'Replay',
                SB: 'Skyblock',
                SC: 'Soccer',
                SG: 'Survival Games',
                SP: 'Spleef',
                SW: 'SkyWars',
                TB: 'The Bridge',
                TR: 'TNT Run',
                UHC: 'UHC'
            }
            let meta = Object.keys(metaData)

            for (let win in wins) {
                if (meta.includes(win) && wins[win] !== 0) data.winsData.push(`[${metaData[win]}:](${client.invite}) ${wins[win].toLocaleString()}`);
            }

            if (!data.winsData.length) data.winsData.push('N/A')

            if (data.punishments > 0) {
                res.punishments.forEach(punishment => {
                    let col = []
                    for (let data in punishment) {
                        if (data == 'expires') col.push(`expires: ${new Date(punishment[data] * 1000)}`)
                        else col.push(`${data}: ${punishment[data]}`)
                    }
                    data.punishmentsArr.push(col.join('\n'))
                })
                punishmentURL = await create([{ content: data.punishmentsArr.join('\n\n'), language: 'yaml' }], { title: `NG_Punishments_${data.name.replace(/ +/g, '_')}`, description: 'Player Punishments' })
            }

            if (data.warnings > 0) {
                res.warnings.forEach(warning => {
                    let col = []
                    for (let data in warning) {
                        if (data == 'time') col.push(`time: ${new Date(warning[data] * 1000)}`)
                        else col.push(`${data}: ${warning[data]}`)
                    }
                    data.warningsArr.push(col.join('\n'))
                })
                warnsURL = await create([{ content: data.warningsArr.join('\n\n'), language: 'yaml' }], { title: `NG_Warns_${data.name.replace(/ +/g, '_')}`, description: 'Player Warnings' })
            }

            let lastEmbed = new Discord.MessageEmbed()
                .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
                .setTitle(`${data.name}`)
                .setTimestamp(data.online == true ? Date.now() : moment(res.lastJoin).valueOf())
                .setColor('E5993B')
                .setThumbnail(data.icon)
                .setURL(`https://portal.nethergames.org/player/${encodeURIComponent(data.name)}`)
                .addFields(
                    { name: 'KDR', value: `(${(((!res.kills ? 0 : res.kills) / (!res.deaths ? 0 : res.deaths)).toFixed(2) * 1).toLocaleString()}) ${(((!res.kills ? 0 : res.kills) / (!res.deaths ? 0 : res.deaths)).toFixed(5) * 1).toLocaleString()} `, inline: true },
                    { name: 'Kills', value: data.kills, inline: true },
                    { name: 'Deaths', value: data.deaths, inline: true },
                    { name: 'WLR', value: `(${(((!res.wins ? 0 : res.wins) / (!res.losses ? 0 : res.losses)).toFixed(2) * 1).toLocaleString()}) ${(((!res.wins ? 0 : res.wins) / (!res.losses ? 0 : res.losses)).toFixed(5) * 1).toLocaleString()}`, inline: true },
                    { name: 'Wins', value: data.wins, inline: true },
                    { name: 'Losses', value: data.losses, inline: true },
                    { name: 'Credits', value: data.credits, inline: true },
                    { name: 'Vote Status', value: data.vote, inline: true },
                    { name: 'Level', value: data.level, inline: true },
                    { name: 'Total XP', value: data.xp, inline: true },
                    { name: 'XUID', value: data.xuid, inline: true },
                    { name: 'Tag', value: `${data.guildTagColor}${data.tag}`, inline: true },
                    { name: 'Tier', value: data.tier, inline: true },
                    { name: 'Ranks', value: data.ranks, inline: true },
                    { name: 'Guild', value: data.guild, inline: true },
                    { name: 'First Join', value: `${data.joined == 'N/A' ? 'N/A' : `<t:${data.joined}>\n(<t:${data.joined}:R>)`}`, inline: true },
                    { name: 'Last Join', value: `${data.lastJoin == 'N/A' ? 'N/A' : `<t:${data.lastJoin}>\n(<t:${data.lastJoin}:R>)`}`, inline: true },
                    { name: 'Biography', value: data.bio },
                    { name: 'Wins Summary', value: data.winsData.join('\n') },
                    { name: 'Warnings', value: data.warnings > 0 ? `[${data.warnings} Warnin${data.warnings == 1 ? 'g' : 'gs'}](${warnsURL.url})` : 'No Warnings', inline: true },
                    { name: 'Punishments', value: data.punishments > 0 ? `[${data.punishments} Punishmen${data.punishments == 1 ? 't' : 'ts'}](${punishmentURL.url})` : `No Punishments`, inline: true },
                )
                .setFooter(`${data.online == true ? 'Online' : 'Offline'} - ${data.online == true ? 'Playing on' : 'Last Seen on'} ${data.lastServer}`, data.online == true ? online : offline)
            return lastEmbed;
        } catch (e) {
            console.log(e)
            return 'Error: Failed to execute the command';
        }
    }
}
