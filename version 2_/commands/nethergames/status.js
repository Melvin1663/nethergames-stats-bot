module.exports = {
    name: 'status',
    description: 'Gets the NetherGames status',
    usage: 'ns!status',
    aliases: ['stats'],
    cooldown: 5,
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/status')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}