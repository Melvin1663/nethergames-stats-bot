module.exports = async (client, args, Discord, res) => {
  let metaData = await require('async-get-json')('https://apiv2.nethergames.org/v1/servers/meta')
  let meta = Object.keys(metaData)
  let servers = []
  for (let serv in res) {
    if (meta.includes(serv)) servers.push(`[${metaData[serv]}:](${client.invite}) ${res[serv].players.toLocaleString()}`)
  }

  return new Discord.MessageEmbed()
    .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setTitle(`NetherGames`)
    .setColor('E5993B')
    .setThumbnail('https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
    .setDescription(`**Total Players Online:** ${res.total.toLocaleString()}\n\n${servers.join('\n')}`)
    .setTimestamp()
  }