module.exports = async (client, args, Discord, res) => {
  let lb = res.Lobby
  if (!lb) return 'Error: No Data'
  let lobbies = []
  for (let serv in lb) {
    if (serv == 'players') continue;
    lobbies.push(`• **Lobby ${serv}:** ${lb[serv].toLocaleString()}`)
  }
  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`Lobbies`)
    .setColor('E5993B')
    .setThumbnail('https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setDescription(`**Total Players Online:** ${lb.players.toLocaleString()}\n\n${lobbies.join('\n')}`)
    .setTimestamp()
}