const get = require('node-fetch');

module.exports = async (Discord, client) => {
    let a = 0;
    let err;

    let res = await get('https://apiv2.nethergames.org/v1/stats/counts', {
        headers: { "Authorization": client.ngKey }
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

    let obj = {
        players: 'Unique Players',
        newPlayers: 'Weekly New Players',
        kills: 'Total Player Kills',
        deaths: 'Total Player Deaths',
        wins: 'Total Player Wins',
        presents: 'Total Presents',
        punishments: 'Total Player Punishments',
        replays: 'Total Game Replays',
        guilds: 'Total Guilds'
    }
    let arr = []

    for (let key in res) {
        if (key != 'lastUpdatedAt') arr.push(`[${obj[key]}:](${client.invite}) ${res[key].toLocaleString()}`)
    }

    return new Discord.MessageEmbed()
        .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
        .setTitle('Overall Statistics')
        .setDescription(arr.join('\n'))
        .setFooter('Last Updated')
        .setTimestamp(parseInt(res.lastUpdatedAt + '000'))
        .setColor('E5993B')
}