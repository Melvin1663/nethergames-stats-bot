const moment = require('moment');

module.exports = async (client, args, Discord, res, online, offline) => {
  let data = res.extra

  if (!data) return 'Error: Unknown data'

  let summary = [`Wins: ${data.ctfWins.toLocaleString()}`, `Kills: ${data.ctfKills.toLocaleString()}`, `Deaths: ${data.ctfDeaths.toLocaleString()}`, `KDR: ${((!data.ctfKills ? 0 : data.ctfKills / data.ctfDeaths).toFixed(3) * 1).toLocaleString()}`, `<:mc_banner:865781352371847189> Captured: ${data.ctfFlagsCollected.toLocaleString()}`, `<:mc_banner:865781352371847189> Returned: ${data.ctfFlagsReturned.toLocaleString()}`]
  let duo = [`Wins: ${data.ctfDoublesWins.toLocaleString()}`, `Kills: ${data.ctfDoublesKills.toLocaleString()}`]
  let squad = [`Wins: ${data.ctfSquadsWins.toLocaleString()}`, `Kills: ${data.ctfSquadsKills.toLocaleString()}`]

  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`${res.name} - Capture the Flag`)
    .setURL(`https://portal.nethergames.org/player/${res.name.replace(/ +/g, '%20')}`)
    .setColor('E5993B')
    .setThumbnail(`https://player.nethergames.org/avatar/${res.name.replace(/ +/g, '%20')}`)
    .addFields(
      { name: 'Summary', value: summary.join('\n'), inline: true },
      { name: 'Doubles', value: duo.join('\n'), inline: true },
      { name: 'Squads', value: squad.join('\n'), inline: true }
    )
    .setTimestamp(res.online == true ? Date.now() : moment(res.lastJoin).valueOf())
    .setFooter(`${res.online == true ? 'Online' : 'Offline'} - ${res.online == true ? 'Playing on' : 'Last Seen on'} ${res.lastServer}`, res.online == true ? online : offline)
}