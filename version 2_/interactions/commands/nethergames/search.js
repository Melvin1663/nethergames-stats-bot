module.exports = {
    name: 'search',
    description: 'Search players, guilds and factions',
    options: [
        {
            name: 'query',
            description: "What you want to search",
            type: 'STRING',
            required: true
        }
    ],
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let res = await require('../../../commands_src/nethergames/search')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}