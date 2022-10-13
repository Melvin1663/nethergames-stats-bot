module.exports = {
    name: 'nexttier',
    description: 'Calculate the next tier of a player',
    options: [
        {
            name: 'player',
            description: "The Players In Game Name (IGN)",
            type: 'STRING',
            required: false
        },
        {
            name: 'tier',
            type: 'STRING',
            description: 'Player Tier Goal',
            required: false,
            choices: [
                { name: 'Silver', value: '?silver' },
                { name: 'Gold', value: '?gold' },
                { name: 'Gaurdian',value: '?gaurdian' },
                { name: 'Eagle', value: '?eagle' },
                { name: 'Elite', value: '?elite' }
            ]
        }
    ],
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let res = await require('../../../commands_src/nethergames/nexttier')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}