module.exports = {
    name: 'info',
    description: 'Gets Information about the bot',
    cooldown: 2,
    aliases: ['about'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/util/info')(Discord, client, msg)
        return msg.channel.send(res)
    }
}