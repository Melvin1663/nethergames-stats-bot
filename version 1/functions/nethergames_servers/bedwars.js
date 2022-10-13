module.exports = async (client, args, Discord, res) => {
  let bw = res.BW
  if (!bw) return 'Error: Cannot find server "Bedwars"'
  let servers_solo = []
  let servers_duo = []
  let servers_squads = []
  for (let serv in bw.Solo) {
    if (serv == 'players') continue;
    servers_solo.push(`• **Server ${serv}:** ${bw.Solo[serv].toLocaleString()}`)
  }
  for (let serv in bw.Doubles) {
    if (serv == 'players') continue;
    servers_duo.push(`• **Server ${serv}:** ${bw.Doubles[serv].toLocaleString()}`)
  }
  for (let serv in bw.Squads) {
    if (serv == 'players') continue;
    servers_squads.push(`• **Server ${serv}:** ${bw.Squads[serv].toLocaleString()}`)
  }
  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`Bedwars`)
    .setColor('E5993B')
    .setThumbnail('https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setDescription(`**Total Players Online:** ${bw.players.toLocaleString()}`)
    .addFields(
      { name: `Solo [${bw.Solo.players.toLocaleString()}]`, value: servers_solo.join('\n'), inline: true },
      { name: `Doubles [${bw.Doubles.players.toLocaleString()}]`, value: servers_duo.join('\n'), inline: true },
      { name: `Squads [${bw.Squads.players.toLocaleString()}]`, value: servers_squads.join('\n'), inline: true }
    )
    .setTimestamp()
}