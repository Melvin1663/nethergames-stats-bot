module.exports = {
    name: 'nexttier',
    description: 'Calculate the next tier of a player',
    usage: 'ns!nexttier (player name) (tier)',
    cooldown: 3,
    aliases: ['nt'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/nexttier')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}