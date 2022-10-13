module.exports = {
    name: 'inv',
    description: 'Gets the Bot Invite Link',
    cooldown: 1,
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/util/inv')(Discord, client, msg)
        return msg.channel.send(res)
    }
}