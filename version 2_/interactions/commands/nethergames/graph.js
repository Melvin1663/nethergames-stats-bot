module.exports = {
    name: 'graph',
    description: 'Get a Graph/Chart Image of a player/guilds Historical data',
    options: [
        {
            name: 'type',
            description: "The type you wanna fetch",
            type: 'STRING',
            required: true,
            choices: [
                { name: 'Player', value: 'player' },
                { name: 'Guild', value: 'guild' }
            ]
        },
        {
            name: 'name',
            description: "The name",
            type: 'STRING',
            required: true
        },
        {
            name: 'graph',
            description: '(Put a "?" before your graph) The type of graph you want to fetch',
            type: 'STRING',
            required: true
        }
    ],
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let res = await require('../../../commands_src/nethergames/graph')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}