module.exports = {
    name: 'help',
    description: "Displays commands!",
    usage: 'ns!help (command)',
    cooldown: 2,
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/util/help')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}