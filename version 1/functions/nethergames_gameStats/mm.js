const moment = require('moment');

module.exports = async (client, args, Discord, res, online, offline) => {
  let data = res.extra

  let summary = [`Wins: ${data.mmWins.toLocaleString()}`, `Kills: ${data.mmKills.toLocaleString()}`, `Deaths: ${data.mmDeaths.toLocaleString()}`, `KDR: ${((data.mmKills / data.mmDeaths).toFixed(3) * 1).toLocaleString()}`, `Bow Kills: ${data.mmBowKills.toLocaleString()}`, `Knife Kills: ${data.mmKnifeKills.toLocaleString()}`, `Thrown Knife Kills: ${data.mmThrowKnifeKills.toLocaleString()}`]
  let classic = [`Wins: ${data.mmClassicWins.toLocaleString()}`, `Kills: ${data.mmClassicKills.toLocaleString()}`, `Deaths: ${data.mmClassicDeaths.toLocaleString()}`, `KDR: ${((data.mmClassicKills / data.mmClassicDeaths).toFixed(3) * 1).toLocaleString()}`]
  let infection = [`Wins: ${data.mmInfectionWins.toLocaleString()}`, `Kills: ${data.mmInfectionKills.toLocaleString()}`, `Deaths: ${data.mmInfectionDeaths.toLocaleString()}`, `KDR: ${((!data.mmInfectionKills ? 0 : data.mmInfectionKills / data.mmInfectionDeaths).toFixed(3) * 1).toLocaleString()}`]

  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`${res.name} - Murder Mystery`)
    .setURL(`https://portal.nethergames.org/player/${res.name.replace(/ +/g, '%20')}`)
    .setColor('E5993B')
    .setThumbnail(`https://player.nethergames.org/avatar/${res.name.replace(/ +/g, '%20')}`)
    .addFields(
      { name: 'Summary', value: summary.join('\n'), inline: true },
      { name: 'Classic', value: classic.join('\n'), inline: true },
      { name: 'Infection', value: infection.join('\n'), inline: true }
    )
    .setTimestamp(res.online == true ? Date.now() : moment(res.lastJoin).valueOf())
    .setFooter(`${res.online == true ? 'Online' : 'Offline'} - ${res.online == true ? 'Playing on' : 'Last Seen on'} ${res.lastServer}`, res.online == true ? online : offline)
}