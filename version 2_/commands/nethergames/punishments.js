module.exports = {
    name: 'punishments',
    description: 'Get a players punishments by their username or XUID.',
    usage: 'ns!punishments (player name)',
    cooldown: 3,
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/punishments')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}