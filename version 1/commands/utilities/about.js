module.exports = {
  name: 'about',
  aliases: ['a'],
  description: "Displays Bot Details",
  cooldown: 3,
  async execute(client, message, cmd, args, Discord) {
    message.reply({
      embeds: [
        new Discord.MessageEmbed()
          .setAuthor(`About ${client.user.username}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
          .setTitle(`${client.user.username}`)
          .setDescription(`Current prefix: \`${client.tempPrefix[message.guild.id]}\``)
          .addFields(
            { name: 'Version', value: '3.5.0', inline: true },
            { name: 'Owner', value: 'Melvin#6591', inline: true },
            { name: 'Uptime', value: (require('hhmmss')(client.uptime / 1000)).toString(), inline: true },
            { name: 'Language', value: 'JavaScript', inline: true },
            { name: 'Node Version', value: process.versions.node.toString(), inline: true },
            { name: 'Commands', value: client.commands.size.toString(), inline: true },
            { name: 'Servers', value: client.guilds.cache.size.toString(), inline: true },
            { name: 'Shards', value: "1", inline: true },
            { name: 'Client Ping', value: `${client.ws.ping.toString()}ms`, inline: true },
            { name: 'Top.gg', value: `[Top.gg](${client.invite})`, inline: true },
            { name: 'Support Server', value: `[Click me](https://discord.gg/aMmBRAQUDD)`, inline: true },
            { name: 'NG Discord', value: `[Click me](https://discord.gg/ng)`, inline: true }
          )
          .setColor('E5993B')
      ]
    })
  }
}