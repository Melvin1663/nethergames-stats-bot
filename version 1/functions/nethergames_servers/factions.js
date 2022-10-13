module.exports = async (client, args, Discord, res) => {
  let f = res.Factions
  if (!f) return 'Error: Cannot find server "Factions"'
  let servs = []
  for (let serv in f) {
    if (serv == 'players') continue;
    servs.push(`• **Server ${serv}:** ${f[serv]}`)
  }
  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`Factions`)
    .setColor('E5993B')
    .setThumbnail('https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setDescription(`**Total Players Online:** ${f.players.toLocaleString()}\n\n${servs.join('\n')}`)
    .setTimestamp()
}