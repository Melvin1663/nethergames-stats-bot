module.exports = {
    name: 'status',
    description: 'Gets the NetherGames status',
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let res = await require('../../../commands_src/nethergames/status')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}