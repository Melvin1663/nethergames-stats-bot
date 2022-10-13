module.exports = async (client, args, Discord, res) => {
  let c = res.Creative
  if (!c) return 'Error: Cannot find server "Creative"'
  let servs = []
  for (let serv in c) {
    if (serv == 'players') continue;
    servs.push(`• **Server ${serv}:** ${c[serv]}`)
  }
  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`Creative`)
    .setColor('E5993B')
    .setThumbnail('https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setDescription(`**Total Players Online:** ${c.players.toLocaleString()}\n\n${servs.join('\n')}`)
    .setTimestamp()
}