module.exports = {
    name: 'stream',
    description: 'Check if NetherGames TV is streaming.',
    usage: 'ns!stream',
    cooldown: 3,
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/stream')(Discord, client, msg)
        return msg.channel.send(res).catch(console.log)
    }
}