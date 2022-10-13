module.exports = {
    name: 'ping',
    description: 'Return bot latency',
    cooldown: 3,
    run: async (Discord, client, msg, args) => {
        let intNow = Date.now();
        let intLater = Date.now();
        let res = await require('../../commands_src/util/ping')(Discord, client, msg, args, intNow, intLater)
        msg.channel.send(res)
    }
}