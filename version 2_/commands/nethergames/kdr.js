module.exports = {
    name: 'kdr',
    description: 'Get a players KDR stats by their username or XUID.',
    usage: 'ns!kdr (player name)',
    cooldown: 3,
    aliases: ['kd'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/kdr')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}