module.exports = {
    name: 'wins',
    description: 'Get a players wins by their username or XUID.',
    usage: 'ns!wins (player name)',
    cooldown: 3,
    aliases: ['w', 'winsummary'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/wins')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}