module.exports = {
    name: 'search',
    description: 'Search players, guilds and factions',
    usage: 'ns!search [query]',
    cooldown: 3,
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/search')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}