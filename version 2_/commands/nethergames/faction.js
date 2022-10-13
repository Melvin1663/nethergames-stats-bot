module.exports = {
    name: 'faction',
    description: 'Get a faction by its name.',
    usage: 'ns!factions (faction name)',
    cooldown: 3,
    aliases: ['f', 'factions'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/factions')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}