const get = require('node-fetch');
const tiny = require('tiny-json-http');

module.exports = async (Discord, client, args) => {
    if (!args.length) return `Please specify a guild`;
    let a = 0
    const data = {
        members: [],
        officers: []
    }
    let err;
    let online = 0;
    let players = {}

    let res = await get(`https://apiv2.nethergames.org/v1/guilds/${args.join('%20')}`, { headers: { "Authorization": client.ngKey } }).catch(e => {
        if (e.message != 'Response code 404 (Not Found)') console.log(e)
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

    if (res.message == 'Unknown guild') return 'Error: Unknown Guild'

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

    if (args[args.length - 1].startsWith('?true')) {
        let playerList = res.members.concat(res.officers)
        playerList.push(res.leader)

        let playerArrs = await tiny.post({
            url: "https://apiv2.nethergames.org/v1/players/batch",
            body: { names: playerList },
            headers: { "Authorization": client.ngKey }
        });

        playerArrs.body.forEach(p => {
            players[p.name] = p.online ? '🟢' : '🔴'
        })

        for (let player in players) {
            if (players[player] == '🟢') online++
        }
    }

    try {
        data.leader = !res.leader ? 'N/A' : `[${res.leader}](https://portal.nethergames.org/player/${encodeURIComponent(res.leader)})`
        data.name = !res.name ? 'N/A' : res.name
        data.motd = !res.motd ? 'N/A' : res.motd
        data.tag = !res.tag ? 'N/A' : res.tag
        data.maxSize = !res.maxSize ? 'N/A' : res.maxSize
        data.icon = `https://player.nethergames.org/avatar/${encodeURIComponent(res.leader)}`
        data.memberCount = (res.members.length + 1 + res.officers.length).toLocaleString()
        data.tagColor = !res.rawTag?.startsWith('Â') ? '' : colorCodes[res.rawTag?.slice(1, res.rawTag?.length - data.tag.length)]
        data.onlineMembers = 0;
        data.onlineOfficers = 0;
        data.onlineLeader = 0;

        if (args[args.length - 1].startsWith('?true')) {
            res.members.forEach(member => {
                data.members.push(`${!players[member] ? '🔴' : players[member]} [${member}](https://portal.nethergames.org/player/${encodeURIComponent(member)})`)
            });
            res.officers.forEach(officer => {
                data.officers.push(`${!players[officer] ? '🔴' : players[officer]} [${officer}](https://portal.nethergames.org/player/${encodeURIComponent(officer)})`)
            });
            data.members.forEach(i => {
                if (i.includes('🟢')) data.onlineMembers++
            })
            data.officers.forEach(i => {
                if (i.includes('🟢')) data.onlineOfficers++
            })
            if (players[res.leader].includes('🟢')) data.onlineLeader++
        } else {
            res.members.forEach(member => {
                data.members.push(`[${member}](https://portal.nethergames.org/player/${encodeURIComponent(member)})`)
            })
            res.officers.forEach(officer => {
                data.officers.push(`[${officer}](https://portal.nethergames.org/player/${encodeURIComponent(officer)})`)
            })
        }

        if (!data.members.length) data.members.push('N/A');
        if (!data.officers.length) data.officers.push('N/A');

        let newEmbed = new Discord.MessageEmbed()
            .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
            .setTitle(`${data.name}`)
            .setTimestamp()
            .setColor('E5993B')
            .setDescription(`**Leader [1]**\n${data.leader}\n\n**Officer${data.officers.length == 1 ? (data.officers[0] == 'N/A' ? '' : '') : 's'} [${data.officers.length == 1 ? (data.officers[0] == 'N/A' ? '0' : data.officers.length) : data.officers.length}]**\n${data.officers.join('\n')}\n\n**Member${data.members.length == 1 ? (data.members[0] == 'N/A' ? '' : '') : 's'} [${data.members.length == 1 ? (data.members[0] == 'N/A' ? '0' : data.members.length) : data.members.length}]**\n${data.members.join('\n')}`)
            .addFields(
                { name: 'Members', value: data.memberCount, inline: true },
                { name: 'MOTD', value: data.motd, inline: true },
                { name: 'Tag', value: `${data.tagColor}${data.tag}`, inline: true },
            )
            .setThumbnail(data.icon)
            .setURL(`https://portal.nethergames.org/guild/${encodeURIComponent(data.name)}`)

        if (args[args.length - 1].startsWith('?true')) {
            newEmbed.setFooter(`Members Online: ${online}/${data.memberCount}`);
            newEmbed.setDescription(`**Leader [${data.onlineLeader}/1]**\n${players[res.leader]} ${data.leader}\n\n**Officer${data.officers.length == 1 ? (data.officers[0] == 'N/A' ? '' : '') : 's'} [${data.onlineOfficers}/${data.officers.length == 1 ? (data.officers[0] == 'N/A' ? '0' : data.officers.length) : data.officers.length}]**\n${data.officers.join('\n')}\n\n**Member${data.members.length == 1 ? (data.members[0] == 'N/A' ? '' : '') : 's'} [${data.onlineMembers}/${data.members.length == 1 ? (data.members[0] == 'N/A' ? '0' : data.members.length) : data.members.length}]**\n${data.members.join('\n')}`)
        }

        return newEmbed;
    } catch (e) {
        console.log(e);
        return 'Error: Failed to execute the command'
    }
}