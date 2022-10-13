module.exports = async (client, args, Discord, res) => {
  let sw = res.SW
  if (!sw) return 'Error: Cannot find server "Sky Wars"'
  let servers_solo = []
  let servers_duo = []
  let servers_1v1 = []
  let servers_2v2 = []
  for (let serv in sw.Solo) {
    if (serv == 'players') continue;
    servers_solo.push(`• **Server ${serv}:** ${sw.Solo[serv].toLocaleString()}`)
  }
  for (let serv in sw.Doubles) {
    if (serv == 'players') continue;
    servers_duo.push(`• **Server ${serv}:** ${sw.Doubles[serv].toLocaleString()}`)
  }
  for (let serv in sw['1v1']) {
    if (serv == 'players') continue;
    servers_1v1.push(`• **Server ${serv}:** ${sw['1v1'][serv].toLocaleString()}`)
  }
  for (let serv in sw['2v2']) {
    if (serv == 'players') continue;
    servers_2v2.push(`• **Server ${serv}:** ${sw['2v2'][serv].toLocaleString()}`)
  }

  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`Sky Wars`)
    .setColor('E5993B')
    .setThumbnail('https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setDescription(`**Total Players Online:** ${sw.players.toLocaleString()}`)
    .addFields(
      { name: `Solo [${sw.Solo.players.toLocaleString()}]`, value: servers_solo.join('\n'), inline: true },
      { name: `Doubles [${sw.Doubles.players.toLocaleString()}]`, value: servers_duo.join('\n'), inline: true },
      { name: '\u200b', value: '\u200b', inline: true },
      { name: `1v1 [${sw['1v1'].players.toLocaleString()}]`, value: servers_1v1.join('\n'), inline: true },
      { name: `2v2 [${sw['2v2'].players.toLocaleString()}]`, value: servers_2v2.join('\n'), inline: true },
      { name: '\u200b', value: '\u200b', inline: true },
    )
    .setTimestamp()
}