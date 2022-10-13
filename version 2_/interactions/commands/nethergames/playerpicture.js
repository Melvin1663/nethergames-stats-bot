module.exports = {
    name: 'playerpicture',
    description: '(IMG) Get a player by their username or XUID.',
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
        let res = await require('../../../commands_src/nethergames/playerpicture')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}