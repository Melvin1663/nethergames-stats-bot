module.exports = {
    name: 'vote',
    description: 'Gives you links for where to vote',
    usage: 'ns!vote',
    aliases: ['v'],
    cooldown: 5,
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/vote')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}