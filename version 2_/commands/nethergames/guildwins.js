module.exports = {
    name: 'guildwins',
    description: 'Fetch Guild Wins Since last week.',
    usage: 'ns!guildwins (guild name)',
    cooldown: 3,
    aliases: [],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/guildwins')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}