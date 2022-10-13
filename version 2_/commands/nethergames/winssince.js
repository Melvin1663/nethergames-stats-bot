module.exports = {
    name: 'winssince',
    description: 'Get a players wins since (time)',
    usage: 'ns!winssince (player name) [time]',
    cooldown: 3,
    aliases: ['ws'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/winssince')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}