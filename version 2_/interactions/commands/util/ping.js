module.exports = {
    name: 'ping',
    description: 'Return bot latency',
    run: async (Discord, client, int, args) => {
        let intNow = Date.now();
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let intLater = Date.now();
        let res = await require('../../../commands_src/util/ping')(Discord, client, int, args, intNow, intLater)
        return int.editReply(res).catch(console.log)
    }
}