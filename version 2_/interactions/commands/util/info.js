module.exports = {
    name: 'info',
    description: 'Shows information about the bot',
    run: async (Discord, client, int, args) => {
        let res = await require('../../../commands_src/util/info')(Discord, client, int)
        return int.reply(res).catch(console.log)
    }
}