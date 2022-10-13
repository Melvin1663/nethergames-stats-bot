const moment = require('moment');

module.exports = async (client, args, Discord, res, online, offline) => {
  let data = res.extra

  if (!data) return 'Error: Unknown data'

  let summary = [`Wins: ${data.bwWins.toLocaleString()}`, `Kills: ${data.bwKills.toLocaleString()}`, `Deaths: ${data.bwDeaths.toLocaleString()}`, `KDR: ${(!data.bwKills ? 0 : data.bwKills / data.bwDeaths).toFixed(3)}`, `<:mc_bed:865775329817919498> Broken: ${data.bwBedsBroken.toLocaleString()}`, `Final Kills: ${data.bwFinalKills.toLocaleString()}`]
  let solo = [`Wins: ${data.bwSoloWins.toLocaleString()}`, `Kills: ${data.bwSoloKills.toLocaleString()}`, `Deaths: ${data.bwSoloDeaths.toLocaleString()}`, `KDR: ${((!data.bwSoloKills ? 0 : data.bwSoloKills / data.bwSoloDeaths).toFixed(3) * 1).toLocaleString()}`, `<:mc_bed:865775329817919498> Broken: ${data.bwSoloBedsBroken.toLocaleString()}`, `Final Kills: ${data.bwSoloFinalKills.toLocaleString()}`]
  let duo = [`Wins: ${data.bwDoublesWins.toLocaleString()}`, `Kills: ${data.bwDoublesKills.toLocaleString()}`, `Deaths: ${data.bwDoublesDeaths.toLocaleString()}`, `KDR: ${((!data.bwDoublesKills ? 0 : data.bwDoublesKills / data.bwDoublesDeaths).toFixed(3) * 1).toLocaleString()}`, `<:mc_bed:865775329817919498> Broken: ${data.bwDoublesBedsBroken.toLocaleString()}`, `Final Kills: ${data.bwDoublesFinalKills.toLocaleString()}`]
  let triples = [`Wins: ${data.bwTriosWins.toLocaleString()}`, `Kills: ${data.bwTriosKills.toLocaleString()}`, `Deaths: ${data.bwTriosDeaths.toLocaleString()}`, `KDR: ${((!data.bwTriosKills ? 0 : data.bwTriosKills / data.bwTriosDeaths).toFixed(3) * 1).toLocaleString()}`, `<:mc_bed:865775329817919498> Broken: ${data.bwTriosBedsBroken.toLocaleString()}`, `Final Kills: ${data.bwTriosFinalKills.toLocaleString()}`]
  let squads = [`Wins: ${data.bwSquadsWins.toLocaleString()}`, `Kills: ${data.bwSquadsKills.toLocaleString()}`, `Deaths: ${data.bwSquadsDeaths.toLocaleString()}`, `KDR: ${((!data.bwSquadsKills ? 0 : data.bwSquadsKills / data.bwSquadsDeaths).toFixed(3) * 1).toLocaleString()}`, `<:mc_bed:865775329817919498> Broken: ${data.bwSquadsBedsBroken.toLocaleString()}`, `Final Kills: ${data.bwSquadsFinalKills.toLocaleString()}`]
  let misc = [`<:diamond:865587581546790942> Collected: ${data.bwDiamondsCollected.toLocaleString()}`, `<:emerald:865587672456888380> Collected: ${data.bwEmeraldsCollected.toLocaleString()}`, `<:gold_ingot:865587747216293919> Collected: ${data.bwGoldCollected.toLocaleString()}`, `<:iron_ingot:865587820524732437> Collected: ${data.bwIronCollected.toLocaleString()}`]

  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`${res.name} - Bedwars`)
    .setURL(`https://portal.nethergames.org/player/${res.name.replace(/ +/g, '%20')}`)
    .setColor('E5993B')
    .setThumbnail(`https://player.nethergames.org/avatar/${res.name.replace(/ +/g, '%20')}`)
    .addFields(
      { name: 'Summary', value: summary.join('\n'), inline: true },
      { name: 'Misc', value: misc.join('\n'), inline: true },
      { name: 'Solos', value: solo.join('\n'), inline: true },
      { name: 'Doubles', value: duo.join('\n'), inline: true },
      { name: 'Trios', value: triples.join('\n'), inline: true },
      { name: 'Squads', value: squads.join('\n'), inline: true },
    )
    .setTimestamp(res.online == true ? Date.now() : moment(res.lastJoin).valueOf())
    .setFooter(`${res.online == true ? 'Online' : 'Offline'} - ${res.online == true ? 'Playing on' : 'Last Seen on'} ${res.lastServer}`, res.online == true ? online : offline)
}