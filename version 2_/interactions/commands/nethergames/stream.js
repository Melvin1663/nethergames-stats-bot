module.exports = {
    name: 'stream',
    description: 'Check if NetherGames TV is streaming.',
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let res = await require('../../../commands_src/nethergames/stream')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}