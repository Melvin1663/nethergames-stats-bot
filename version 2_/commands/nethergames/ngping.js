module.exports = {
    name: 'ngping',
    description: 'Return NetherGames Servers latency',
    cooldown: 3,
    run: async (Discord, client, msg, args) => {
        let intNow = Date.now();
        let intLater = Date.now();
        let res = await require('../../commands_src/nethergames/ngping')(Discord, client, msg, args, intNow, intLater)
        msg.channel.send(res)
    }
}