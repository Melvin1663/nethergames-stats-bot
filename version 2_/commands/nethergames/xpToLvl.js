module.exports = {
    name: 'xptolvl',
    description: 'Converts XP to Level',
    usage: 'ns!xptolvl',
    aliases: ['lvl'],
    cooldown: 5,
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/xpToLvl')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}