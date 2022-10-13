const moment = require('moment');

module.exports = async (client, args, Discord, res, online, offline) => {
  let data = res.extra

  if (!data) return 'Error: Unknown data'

  let summary = [`Wins: ${data.swWins.toLocaleString()}`, `Loses: ${data.swLosses.toLocaleString()}`, `WLR: ${((!data.swWins ? 0 : data.swWins / data.swLosses).toFixed(3) * 1).toLocaleString()}`, `Kills: ${data.swKills.toLocaleString()}`, `Deaths: ${data.swDeaths.toLocaleString()}`, `KDR: ${((!data.swKills ? 0 : data.swKills / data.swDeaths).toFixed(3) * 1).toLocaleString()}`, `Blocks Broken: ${data.swBlocksBroken.toLocaleString()}`, `Blocks Placed: ${data.swBlocksPlaced.toLocaleString()}`, `<:arrow:865889190889652256> Shot: ${data.swArrowsShot.toLocaleString()}`, `<:mc_egg:865889603452665856> Thrown: ${data.swEggsThrown.toLocaleString()}`, `<:ender_pearl:865889810673958942> Thrown: ${data.swEpearlsThrown.toLocaleString()}`]
  let solo = [`Wins: ${data.swSoloWins.toLocaleString()}`, `Loses: ${data.swSoloLosses.toLocaleString()}`, `WLR: ${((!data.swSoloWins ? 0 : data.swSoloWins / data.swSoloLosses).toFixed(3) * 1).toLocaleString()}`, `Kills: ${data.swSoloKills.toLocaleString()}`, `Deaths: ${data.swSoloDeaths.toLocaleString()}`, `KDR: ${((!data.swSoloKills ? 0 : data.swSoloKills / data.swSoloDeaths).toFixed(3) * 1).toLocaleString()}`, `Normal Kills: ${data.swSoloNormalKills.toLocaleString()}`, `Normal Deaths: ${data.swSoloNormalDeaths.toLocaleString()}`, `Normal KDR: ${((!data.swSoloNormalKills ? 0 : data.swSoloNormalKills / data.swSoloNormalDeaths).toFixed(3) * 1).toLocaleString()}`, `Insane Kills: ${data.swSoloInsaneKills.toLocaleString()}`, `Insane Deaths: ${data.swSoloInsaneDeaths.toLocaleString()}`, `Insane KDR: ${((!data.swSoloInsaneKills ? 0 : data.swSoloInsaneKills / data.swSoloInsaneDeaths).toFixed(3) * 1).toLocaleString()}`]
  let duo = [`Wins: ${data.swDoublesWins.toLocaleString()}`, `Loses: ${data.swDoublesLosses.toLocaleString()}`, `WLR: ${((!data.swDoublesWins ? 0 : data.swDoublesWins / data.swDoublesLosses).toFixed(3) * 1).toLocaleString()}`, `Kills: ${data.swDoublesKills.toLocaleString()}`, `Deaths: ${data.swDoublesDeaths.toLocaleString()}`, `KDR: ${((!data.swDoublesKills ? 0 : data.swDoublesKills / data.swDoublesDeaths).toFixed(3) * 1).toLocaleString()}`, `Normal Kills: ${data.swDoublesNormalKills.toLocaleString()}`, `Normal Deaths: ${data.swDoublesNormalDeaths.toLocaleString()}`, `Normal KDR: ${((!data.swDoublesNormalKills ? 0 : data.swDoublesNormalKills / data.swDoublesNormalDeaths).toFixed(3) * 1).toLocaleString()}`, `Insane Kills: ${data.swDoublesInsaneKills.toLocaleString()}`, `Insane Deaths: ${data.swDoublesInsaneDeaths.toLocaleString()}`, `Insane KDR: ${((!data.swDoublesInsaneKills ? 0 : data.swDoublesInsaneKills / data.swDoublesInsaneDeaths).toFixed(3) * 1).toLocaleString()}`]

  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`${res.name} - SkyWars`)
    .setURL(`https://portal.nethergames.org/player/${res.name.replace(/ +/g, '%20')}`)
    .setColor('E5993B')
    .setThumbnail(`https://player.nethergames.org/avatar/${res.name.replace(/ +/g, '%20')}`)
    .addFields(
      { name: 'Summary', value: summary.join('\n'), inline: true },
      { name: 'Solo', value: solo.join('\n'), inline: true },
      { name: 'Doubles', value: duo.join('\n'), inline: true }
    )
    .setTimestamp(res.online == true ? Date.now() : moment(res.lastJoin).valueOf())
    .setFooter(`${res.online == true ? 'Online' : 'Offline'} - ${res.online == true ? 'Playing on' : 'Last Seen on'} ${res.lastServer}`, res.online == true ? online : offline)
}