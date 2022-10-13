module.exports = {
    name: 'prefix',
    description: 'Changes bot prefixes',
    usage: 'ns!prefix (new prefix)',
    cooldown: 10,
    aliases: ['setprefix'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/util/prefix')(Discord, client, msg, args)
        return msg.channel.send(res)
    }
}