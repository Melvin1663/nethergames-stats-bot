module.exports = {
    name: 'link',
    description: "Link a player, guild, or a faction",
    usage: 'ns!link [action] (type) (input)',
    cooldown: 2,
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/util/link')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}