module.exports = {
  name: 'faction',
  aliases: ['f'],
  description: "Search on NetherGames for Factions",
  usage: 'ns!f [faction name]',
  example: ['ns!f rebirth', 'ns!f pvpgods', 'ns!f enderwatchers'],
  cooldown: 2,
  async execute(client, message, cmd, args, Discord) {
    const res = await require('../../functions/command_functions/nethergames/factions')(Discord, client, args)
    if (!res) return message.reply('Error: Unknown Error');
    if (typeof (res) == 'string') return message.reply(res);
    else if (typeof (res) == 'object') return message.reply({ embeds: [res] })
    else return message.reply('Error: Failed to execute command');
  }
}