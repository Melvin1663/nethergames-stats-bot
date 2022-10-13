module.exports = async (client, args, Discord, res) => {
  let tb = res.TB
  if (!tb) return 'Error: Cannot find server "The Bridge"'
  let servers_solo = []
  let servers_duo = []
  for (let serv in tb.Solo) {
    if (serv == 'players') continue;
    servers_solo.push(`• **Server ${serv}:** ${tb.Solo[serv].toLocaleString()}`)
  }
  for (let serv in tb.Doubles) {
    if (serv == 'players') continue;
    servers_duo.push(`• **Server ${serv}:** ${tb.Doubles[serv].toLocaleString()}`)
  }

  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`The Bridge`)
    .setColor('E5993B')
    .setThumbnail('https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setDescription(`**Total Players Online:** ${tb.players.toLocaleString()}`)
    .addFields(
      { name: `Solo [${tb.Solo.players.toLocaleString()}]`, value: servers_solo.join('\n'), inline: true },
      { name: `Doubles [${tb.Doubles.players.toLocaleString()}]`, value: servers_duo.join('\n'), inline: true }
    )
    .setTimestamp()
}