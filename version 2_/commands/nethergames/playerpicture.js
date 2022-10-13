module.exports = {
    name: 'playerpicture',
    description: '(IMG) Get a player by their username or XUID.',
    usage: 'ns!playerpicture (player name)',
    cooldown: 5,
    aliases: ['pp', 'playerpic'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/playerpicture')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}