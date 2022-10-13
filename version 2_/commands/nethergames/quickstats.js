module.exports = {
    name: 'quickstats',
    description: 'Fetch basic player stats',
    usage: 'ns!player (player name)',
    cooldown: 3,
    aliases: ['qs'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/quickstats')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}