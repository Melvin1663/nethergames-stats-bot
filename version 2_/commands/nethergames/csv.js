module.exports = {
    name: 'csv',
    description: 'Get the CSV file of a player/guilds Historical data',
    usage: 'ns!csv [type] [name]',
    cooldown: 3,
    aliases: ['ngblade'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/csv')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}