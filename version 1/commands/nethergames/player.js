module.exports = {
  name: 'player',
  aliases: ['p'],
  description: "Search on NetherGames for Players",
  usage: 'ns!p [player ign] ?[optional minigame]',
  example: ['ns!p Skylelo', 'ns!p chr7st', 'ns!p ponkobrine ?bw'],
  cooldown: 3,
  async execute(client, message, cmd, args, Discord) {
    const res = await require('../../functions/command_functions/nethergames/player')(Discord, client, args);
    if (!res) return message.reply('Error: Unknown Error');
    if (typeof (res) == 'string') return message.reply(res)
    else if (typeof (res) == 'object') return message.reply({ embeds: [res] })
    else return message.reply('Error: Failed to execute command')
  }
}