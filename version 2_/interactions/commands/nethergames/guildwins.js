module.exports = {
    name: 'guildwins',
    description: 'Fetch Guild Wins Since last week.',
    options: [
        {
            name: 'guild',
            description: "The Guilds Name",
            type: 'STRING',
            required: false
        }
    ],
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let res = await require('../../../commands_src/nethergames/guildwins')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}