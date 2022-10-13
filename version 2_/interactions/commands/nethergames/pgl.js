module.exports = {
    name: 'pgl',
    description: 'Player Global Leaderboard Stats',
    options: [
        {
            name: 'player',
            description: 'The Players In Game Name (IGN)',
            type: 'STRING',
            required: false,
        }
    ],
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let res = await require('../../../commands_src/nethergames/pgl')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}