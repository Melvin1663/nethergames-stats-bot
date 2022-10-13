module.exports = {
    name: 'guild',
    description: 'Get a guild by its name.',
    usage: 'ns!guild (guild name)',
    cooldown: 3,
    aliases: ['g', 'guilds'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/guild')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}