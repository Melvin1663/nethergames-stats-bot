module.exports = {
    name: 'invite',
    description: 'Gets the Bot Invite Link',
    run: async (Discord, client, int, args) => {
        let res = await require('../../../commands_src/util/inv')(Discord, client, int)
        return int.reply(res).catch(console.log)
    }
}