module.exports = {
    name: 'player',
    description: 'Get a player by their username or XUID.',
    usage: 'ns!player (player name) ?(gamemode)',
    cooldown: 3,
    aliases: ['p'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/player')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}