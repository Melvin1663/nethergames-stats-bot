module.exports = async (client, args, Discord, res) => {
  let uhc = res.UHC
  if (!uhc) return 'Error: No Data'
  let servers_solo = []
  for (let serv in uhc.Solo) {
    if (serv == 'players') break;
    servers_solo.push(`• **Server ${serv}:** ${uhc.Solo[serv]}`)
  }

  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`Ultra Hard Code (UHC)`)
    .setColor('E5993B')
    .setThumbnail('https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setDescription(`**Total Players Online:** ${uhc.players.toLocaleString()}`)
    .addFields(
      { name: `Solo [${uhc.Solo.players.toLocaleString()}]`, value: servers_solo.join('\n'), inline: true }
    )
    .setTimestamp()
}