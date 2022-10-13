module.exports = {
  name: 'ping',
  aliases: ['pong'],
  description: "Gets the Bot Latency",
  cooldown: 3,
  async execute(client, message, cmd, args, Discord) {
    const BLI = Math.abs(Date.now() - message.createdTimestamp)
    message.reply('🏓 Pong!').then(msg => msg.edit(`🏓 Pong! \`${BLI}ms\``))
  }
}