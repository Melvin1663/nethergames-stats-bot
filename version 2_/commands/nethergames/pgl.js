module.exports = {
    name: 'pgl',
    description: 'Get a players game leaderboard stats by their username or XUID.',
    usage: 'ns!pgl (player name)',
    cooldown: 3,
    aliases: ['playergameleaderboard'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/pgl')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}