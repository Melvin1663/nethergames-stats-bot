const moment = require('moment');

module.exports = async (client, args, Discord, res, online, offline) => {
  let data = res.extra

  if (!data) return 'Error: Unknown data'

  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`${res.name} - TNT Run`)
    .setURL(`https://portal.nethergames.org/player/${res.name.replace(/ +/g, '%20')}`)
    .setColor('E5993B')
    .setThumbnail(`https://player.nethergames.org/avatar/${res.name.replace(/ +/g, '%20')}`)
    .setDescription(`Wins: ${data.trWins.toLocaleString()}\nLoses: ${data.trLosses.toLocaleString()}\nWLR: ${((!data.trWins ? 0 : data.trWins / data.trLosses).toFixed(3) * 1).toLocaleString()}\nBlocks Dropped: ${data.trBlocksDropped.toLocaleString()}\nTime Record: ${data.trTimeRecord.toLocaleString()}`)
    .setTimestamp(res.online == true ? Date.now() : moment(res.lastJoin).valueOf())
    .setFooter(`${res.online == true ? 'Online' : 'Offline'} - ${res.online == true ? 'Playing on' : 'Last Seen on'} ${res.lastServer}`, res.online == true ? online : offline)
}