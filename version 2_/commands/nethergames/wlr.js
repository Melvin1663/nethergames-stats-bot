module.exports = {
    name: 'wlr',
    description: 'Get a players WLR stats by their username or XUID.',
    usage: 'ns!wlr (player name)',
    cooldown: 3,
    aliases: ['wl'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/wlr')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}