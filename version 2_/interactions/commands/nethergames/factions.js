module.exports = {
    name: 'factions',
    description: 'Get a faction by its name.',
    options: [
        {
            name: 'faction',
            description: "The Factions Name",
            type: 'STRING',
            required: false
        },
        {
            name: 'status',
            description: "Show online status of members",
            type: 'STRING',
            required: false,
            choices: [
                { name: 'Yes', value: '?true' },
                { name: 'Yes + Location', value: '?truew' },
                { name: 'No', value: '?false' }
            ]
        }
    ],
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let res = await require('../../../commands_src/nethergames/factions')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}