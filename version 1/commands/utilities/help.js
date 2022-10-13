module.exports = {
  name: 'help',
  description: "Displays commands!",
  usage: 'ns!help [optional command]',
  example: ['ns!help player', 'ns!help', 'ns!help about'],
  cooldown: 2,
  async execute(client, message, cmd, args, Discord) {
    
    const helpEmbed = new Discord.MessageEmbed()
      .setColor('E5993B')
      .setAuthor(`${client.user.username} Commands!`, 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
      .setThumbnail('https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
      .setDescription((client.commands.map(c => `\`${c.name}\` - ${c.description}\n`)).toString().replace(/,/g, ''))
      .setTimestamp()

    if (!args.length) return message.reply({ embeds: [helpEmbed] });
    if (client.commands.has(args[0].toLowerCase()) || client.commands.find(a => a.aliases && a.aliases.includes(args[0].toLowerCase()))) {
      let command = client.commands.get(args[0]) || client.commands.find(a => a.aliases && a.aliases.includes(args[0].toLowerCase()))
      message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} Command!`, 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
            .setThumbnail('https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
            .setColor('E5993B')
            .setTitle(`Command: ${command.name}`)
            .setDescription((`**Description:**\n${!command.description ? 'N/A' : command.description}\n**Aliases:**\n${!command.aliases ? 'N/A' : command.aliases.join(', ')}\n**Usage:**\n${!command.usage ? 'N/A' : command.usage}\n**Examples:**\n\`${!command.example ? 'N/A' : command.example.join('\`, \`')}\``).toString())
            .setTimestamp()
        ]
      })
    }
  }
}