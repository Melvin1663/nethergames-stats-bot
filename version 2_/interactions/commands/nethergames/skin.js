module.exports = {
    name: 'skin',
    description: 'Gets the Skin file of a NetherGames player',
    options: [
        {
            name: 'player',
            description: "The Players In Game Name (IGN)",
            type: 'STRING',
            required: false
        }
    ],
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let res = await require('../../../commands_src/nethergames/skin')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}