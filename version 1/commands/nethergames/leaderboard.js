module.exports = {
  name: 'leaderboard',
  aliases: ['lb', 'l'],
  description: "Search on NetherGames for Leaderboards",
  usage: 'ns!lb [type] [column/scope]',
  example: ['ns!lb kills', 'ns!lb credits', 'ns!lb game bw_beds_broken'],
  cooldown: 3,
  async execute(client, message, cmd, args, Discord) {
    const res = await require('../../functions/command_functions/nethergames/leaderboard')(Discord, client, args);
    if (!res) return message.reply('Error: Unknown Error');
    if (typeof (res) == 'string') message.reply(res);
    else if (typeof (res) == 'object') message.reply({ embeds: [res[0]], components: [res[1]] })
    else return message.reply('Error: Failed to execute command')
  }
}