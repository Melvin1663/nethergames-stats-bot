module.exports = {
    name: 'track',
    description: "Tracks Statistical History of a player or a guild",
    usage: 'ns!track [type] [name]',
    cooldown: 2,
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/util/track')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}