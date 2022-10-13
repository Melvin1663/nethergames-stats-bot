module.exports = {
    name: 'nextguildtag',
    description: 'Calculate the next tag of a guild',
    options: [
        {
            name: 'guild',
            description: "The Guilds name",
            type: 'STRING',
            required: false
        },
        {
            name: 'tag',
            type: 'STRING',
            description: 'Guild Tag Goal',
            required: false,
            choices: [
                { name: 'Gray', value: '?gray' },
                { name: 'Dark Aqua', value: '?dark aqua' },
                { name: 'Yellow', value: '?yellow' },
                { name: 'Dark Green', value: '?dark green' },
                { name: 'Pink', value: '?pink' },
                { name: 'Gold', value: '?gold' }
            ]
        }
    ],
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let res = await require('../../../commands_src/nethergames/nextguildtag')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}