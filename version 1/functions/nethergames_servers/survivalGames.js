module.exports = async (client, args, Discord, res) => {
  let sg = res.SG
  if (!sg) return 'Error: Cannot find server "Survival Games"'
  let servers = []
  for (let serv in sg) {
    if (serv == 'players') continue;
    servers.push(`• **Server ${serv}:** ${sg[serv]}`)
  }

  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`Survival Games`)
    .setColor('E5993B')
    .setThumbnail('https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setDescription(`**Total Players Online:** ${sg.players.toLocaleString()}\n\n${servers.join('\n')}`)
    .setTimestamp()
}