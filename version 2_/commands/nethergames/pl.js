module.exports = {
    name: 'pl',
    description: 'Get a players global leaderboard stats by their username or XUID.',
    usage: 'ns!pl (player name)',
    cooldown: 3,
    aliases: ['playerleaderboard'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/pl')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}