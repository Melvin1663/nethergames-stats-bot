const get = require('node-fetch')
const tiny = require('tiny-json-http');

module.exports = async (Discord, client, args) => {
    if (!args.length) return `Please specify a faction`

    let a = 0
    let online = 0;
    let players = {}
    const data = {
        members: [],
        officers: [],
        allies: []
    }
    let err
    let res = await get(`https://apiv2.nethergames.org/v1/factions/${args.join('%20')}`, { headers: { "Authorization": client.ngKey } }).catch(e => {
        if (e.message != 'Response code 404 (Not Found)') console.log(e)
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
        return 'Error: Unknown Error';
    }

    if (res.message == 'Unknown faction') return 'Error: Unknown Faction';

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
        data.id = !res.id ? 'N/A' : res.id
        data.icon = `https://player.nethergames.org/avatar/${encodeURIComponent(res.leader)}`
        data.memberCount = (res.members.length + 1 + res.officers.length).toLocaleString()
        data.strength = !res.strength ? 'N/A' : res.strength.toLocaleString()
        data.onlineMembers = 0;
        data.onlineOfficers = 0;
        data.onlineLeader = 0;

        if (args[args.length - 1].startsWith('?true')) {
            res.members.forEach(member => {
                data.members.push(`${!players[member] ? '🔴' : players[member]} [${member}](https://portal.nethergames.org/player/${encodeURIComponent(member)})`)
            })
            res.officers.forEach(officer => {
                data.officers.push(`${!players[officer] ? '🔴' : players[officer]} [${officer}](https://portal.nethergames.org/player/${encodeURIComponent(officer)})`)
            })
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
        if (!data.allies.length) data.allies.push('N/A')

        let newEmbed = new Discord.MessageEmbed()
            .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
            .setTitle(`${data.name} - ${data.id}`)
            .setTimestamp()
            .setColor('E5993B')
            .addFields(
                { name: 'Leader [1]', value: data.leader, inline: true },
                { name: 'Strength', value: data.strength.toLocaleString(), inline: true },
                { name: 'Member Count', value: data.memberCount.toLocaleString(), inline: true },
                { name: `Officer${data.officers.length == 1 ? (data.officers[0] == 'N/A' ? '' : '') : 's'} [${data.officers.length == 1 ? (data.officers[0] == 'N/A' ? '0' : data.officers.length) : data.officers.length}]`, value: data.officers.join('\n') },
                { name: `Member${data.members.length == 1 ? (data.members[0] == 'N/A' ? '' : '') : 's'} [${data.members.length == 1 ? (data.members[0] == 'N/A' ? '0' : data.members.length) : data.members.length}]`, value: data.members.join('\n') },
                { name: `Alliance${data.allies.length == 1 ? (data.allies[0] == 'N/A' ? '' : '') : 's'} [${data.allies.length == 1 ? (data.allies[0] == 'N/A' ? '0' : data.allies.length) : data.allies.length}]`, value: data.allies.join('\n') }
            )
            .setThumbnail(data.icon)
            .setURL(`https://portal.nethergames.org/factions/${encodeURIComponent(data.name)}`)

        if (args[args.length - 1].startsWith('?true')) {
            newEmbed = new Discord.MessageEmbed()
                .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
                .setTitle(`${data.name} - ${data.id}`)
                .setTimestamp()
                .setColor('E5993B')
                .addFields(
                    { name: `Leader [${data.onlineLeader}/1]`, value: data.leader, inline: true },
                    { name: 'Strength', value: data.strength.toLocaleString(), inline: true },
                    { name: 'Member Count', value: data.memberCount.toLocaleString(), inline: true },
                    { name: `Officer${data.officers.length == 1 ? (data.officers[0] == 'N/A' ? '' : '') : 's'} [${data.onlineOfficers}/${data.officers.length == 1 ? (data.officers[0] == 'N/A' ? '0' : data.officers.length) : data.officers.length}]`, value: data.officers.join('\n') },
                    { name: `Member${data.members.length == 1 ? (data.members[0] == 'N/A' ? '' : '') : 's'} [${data.onlineMembers}/${data.members.length == 1 ? (data.members[0] == 'N/A' ? '0' : data.members.length) : data.members.length}]`, value: data.members.join('\n') },
                    { name: `Alliance${data.allies.length == 1 ? (data.allies[0] == 'N/A' ? '' : '') : 's'} [${data.allies.length == 1 ? (data.allies[0] == 'N/A' ? '0' : data.allies.length) : data.allies.length}]`, value: data.allies.join('\n') }
                )
                .setThumbnail(data.icon)
                .setURL(`https://portal.nethergames.org/factions/${encodeURIComponent(data.name)}`)
                .setFooter(`Members Online: ${online}/${data.memberCount}`);
        }

        return newEmbed;
    } catch (e) {
        console.log(e);
        return 'Error: Failed to execute the command';
    }
}