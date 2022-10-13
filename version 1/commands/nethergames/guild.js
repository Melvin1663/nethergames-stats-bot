module.exports = {
  name: 'guild',
  aliases: ['g'],
  description: "Search on NetherGames for Guilds",
  usage: ['ns!g [guild name]'],
  example: ['ns!g Sanctuary', 'ns!g subtopewds', 'ns!g Chocolate'],
  cooldown: 2,
  async execute(client, message, cmd, args, Discord) {
    const res = await require('../../functions/command_functions/nethergames/guild')(Discord, client, args)
    if (!res) return message.reply('Error: Unknown Error')
    if (typeof (res) == 'string') return message.reply(res);
    else if (typeof (res) == 'object') return message.reply({ embeds: [res] })
    else return message.reply('Error: Failed to execute command');
  }
}