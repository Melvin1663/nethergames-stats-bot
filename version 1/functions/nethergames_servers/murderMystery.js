module.exports = async (client, args, Discord, res) => {
  let mm = res.MM
  if (!mm) return 'Error: No Data'
  let servers_classic = []
  let servers_infection = []
  for (let serv in mm.Classic) {
    if (serv == 'players') continue;
    servers_classic.push(`• **Server ${serv}:** ${mm.Classic[serv]}`)
  }
  for (let serv in mm.Infection) {
    if (serv == 'players') continue;
    servers_infection.push(`• **Server ${serv}:** ${mm.Infection[serv]}`)
  }
  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`Murder Mystery`)
    .setColor('E5993B')
    .setThumbnail('https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setDescription(`**Total Players Online:** ${mm.players.toLocaleString()}`)
    .addFields(
      { name: `Classic [${mm.Classic.players.toLocaleString()}]`, value: servers_classic.join('\n'), inline: true },
      { name: `Infection [${mm.Infection.players.toLocaleString()}]`, value: servers_infection.join('\n'), inline: true }
    )
    .setTimestamp()
}