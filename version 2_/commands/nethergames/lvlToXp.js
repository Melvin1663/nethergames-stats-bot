module.exports = {
    name: 'lvltoxp',
    description: 'Converts Levels to XP',
    usage: 'ns!lvltoxp',
    aliases: ['xp'],
    cooldown: 5,
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/lvlToXp')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}