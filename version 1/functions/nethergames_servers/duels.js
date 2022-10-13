module.exports = async (client, args, Discord, res) => {
  let d = res.Duels
  if (!d) return 'Error: Cannot find server "Duels"'
  let servers_solo = []
  let servers_duos = []
  for (let serv in d.Solo) {
    if (serv == 'players') continue;
    servers_solo.push(`• **Server ${serv}:** ${d.Solo[serv]}`)
  }
  for (let serv in d.Doubles) {
    if (serv == 'players') continue;
    servers_duos.push(`• **Server ${serv}:** ${d.Doubles[serv]}`)
  }
  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`Duels`)
    .setColor('E5993B')
    .setThumbnail('https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setDescription(`**Total Players Online:** ${d.players.toLocaleString()}`)
    .addFields(
      { name: `Solo [${d.Solo.players.toLocaleString()}]`, value: servers_solo.join('\n'), inline: true },
      { name: `Doubles [${d.Doubles.players.toLocaleString()}]`, value: servers_duos.join('\n'), inline: true }
    )
    .setTimestamp()
}