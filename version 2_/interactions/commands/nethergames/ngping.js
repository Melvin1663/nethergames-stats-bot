module.exports = {
    name: 'ngping',
    description: 'Return NetherGames Servers latency',
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let res = await require('../../../commands_src/nethergames/ngping')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}