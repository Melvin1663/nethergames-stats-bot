module.exports = {
    name: 'progress',
    description: 'Get a players stats change by their username or XUID.',
    usage: 'ns!progress (player name) ?(last # days)',
    cooldown: 3,
    aliases: ['change'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/progress')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}