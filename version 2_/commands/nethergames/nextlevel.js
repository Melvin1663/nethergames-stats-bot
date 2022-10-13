module.exports = {
    name: 'nextlevel',
    description: 'Calculate the next level of a player',
    usage: 'ns!nextlevel (player name) (level)',
    cooldown: 3,
    aliases: ['nl'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/nextlevel')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}