module.exports = {
    name: 'changelog',
    description: 'View the bots version history',
    cooldown: 3,
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/util/changelog')(Discord, client, msg, args)
        msg.channel.send(res)
    }
}