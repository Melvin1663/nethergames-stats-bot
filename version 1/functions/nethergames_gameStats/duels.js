const moment = require('moment');

module.exports = async (client, args, Discord, res, online, offline) => {
  let data = res.extra

  if (!data) return 'Error: Unknown data'

  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`${res.name} - Duels`)
    .setURL(`https://portal.nethergames.org/player/${res.name.replace(/ +/g, '%20')}`)
    .setColor('E5993B')
    .setThumbnail(`https://player.nethergames.org/avatar/${res.name.replace(/ +/g, '%20')}`)
    .setDescription(`Wins: ${data.duelsWins.toLocaleString()}\nLoses: ${data.duelsLosses.toLocaleString()}\nWLR: ${((!data.duelsWins ? 0 : data.duelsWins / data.duelsLosses).toFixed(3) * 1).toLocaleString()}\nKills: ${data.duelsKills.toLocaleString()}\nDeaths: ${data.duelsDeaths.toLocaleString()}\nKDR: ${((!data.duelsKills ? 0 : data.duelsKills / data.duelsDeaths).toFixed(3) * 1).toLocaleString()}\nArrows Shot: ${data.duelsArrowsShot.toLocaleString()}\nMelee Hits: ${data.duelsMeleeHits.toLocaleString()}`)
    .setTimestamp(res.online == true ? Date.now() : moment(res.lastJoin).valueOf())
    .setFooter(`${res.online == true ? 'Online' : 'Offline'} - ${res.online == true ? 'Playing on' : 'Last Seen on'} ${res.lastServer}`, res.online == true ? online : offline)
}