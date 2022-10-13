module.exports = {
    name: 'servers',
    description: 'Gets Player counts for NetherGames servers',
    cooldown: 3,
    aliases: ['s', 'server'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/servers')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}