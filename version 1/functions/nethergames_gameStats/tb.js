const moment = require('moment');

module.exports = async (client, args, Discord, res, online, offline) => {
  let data = res.extra

  if (!data) return 'Error: Unknown data'

  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`${res.name} - The Bridge`)
    .setURL(`https://portal.nethergames.org/player/${res.name.replace(/ +/g, '%20')}`)
    .setColor('E5993B')
    .setThumbnail(`https://player.nethergames.org/avatar/${res.name.replace(/ +/g, '%20')}`)
    .setDescription(`Wins: ${data.tbWins.toLocaleString()}\nLoses: ${data.tbLosses.toLocaleString()}\nWLR: ${((!data.tbWins ? 0 : data.tbWins / data.tbLosses).toFixed(3) * 1).toLocaleString()}\nKills: ${data.tbKills.toLocaleString()}\nDeaths: ${data.tbDeaths.toLocaleString()}\nKDR: ${((!data.tbKills ? 0 : data.tbKills / data.tbDeaths).toFixed(3) * 1).toLocaleString()}\nGoals: ${data.tbGoals.toLocaleString()}\nMelee Hits: ${data.tbMeleeHits.toLocaleString()}\n<:arrow:865889190889652256> Shot: ${data.tbArrowsShot.toLocaleString()}`)
    .setTimestamp(res.online == true ? Date.now() : moment(res.lastJoin).valueOf())
    .setFooter(`${res.online == true ? 'Online' : 'Offline'} - ${res.online == true ? 'Playing on' : 'Last Seen on'} ${res.lastServer}`, res.online == true ? online : offline)
}