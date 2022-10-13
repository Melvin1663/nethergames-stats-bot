module.exports = async (client, args, Discord, res) => {
  let r = res.Replay
  if (!r) return 'Error: Cannot find server "Replay"'
  let servers = []
  for (let serv in r) {
    if (serv == 'players') continue;
    servers.push(`• **Server ${serv}:** ${r[serv]}`)
  }
  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`Replay`)
    .setColor('E5993B')
    .setThumbnail('https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setDescription(`**Total Players Online:** ${r.players.toLocaleString()}\n\n${servers.join('\n')}`)
    .setTimestamp()
}