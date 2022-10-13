module.exports = {
  name: 'servers',
  aliases: ['s', 'server'],
  description: "Displays Server Player Counts",
  usage: 'ns!s [optional game server]',
  example: ['ns!s bw', 'ns!s tb', 'ns!s'],
  cooldown: 2,
  async execute(client, message, cmd, args, Discord) {
    const res = await require('../../functions/command_functions/nethergames/servers')(Discord, client, args)
    if (!res) return message.reply('Error: Unknown Error');
    if (typeof (res) == 'string') return message.reply(res)
    else if (typeof (res) == 'object') return message.reply({ embeds: [res] })
    else return message.reply('Error: Failed to execute command')
  }
}