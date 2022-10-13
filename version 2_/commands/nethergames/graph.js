module.exports = {
    name: 'graph',
    description: 'Get a Graph/Chart Image of a player/guilds Historical data',
    usage: 'ns!graph [type] [name] ?[graph]',
    cooldown: 3,
    aliases: ['chart'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/graph')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}