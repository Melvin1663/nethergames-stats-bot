module.exports = async (client, args, Discord, res) => {
  let ms = res.MS
  if (!ms) return 'Error: No Data'
  let servers = []
  for (let serv in ms) {
    if (serv == 'players') continue;
    servers.push(`• **Server ${serv}:** ${ms[serv]}`)
  }
  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`NetherGames`)
    .setColor('E5993B')
    .setThumbnail('https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setDescription(`**Total Players Online:** ${ms.players.toLocaleString()}\n\n${servers.join('\n')}`)
    .setTimestamp()
}