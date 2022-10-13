module.exports = {
    name: 'player',
    description: 'Get a player by their username or XUID.',
    options: [
        {
            name: 'player',
            description: "The Players In Game Name (IGN)",
            type: 'STRING',
            required: false
        },
        {
            name: 'game',
            type: 'STRING',
            description: 'Gets player information for a specific gamemode',
            required: false,
            choices: [
                { name: 'Block Hunt', value: '?bh' },
                { name: 'Bedwars', value: '?bw' },
                { name: 'Conquests', value: '?cq' },
                { name: 'Duels', value: '?duels' },
                { name: 'Murder Mystery', value: '?mm' },
                { name: 'Momma Says', value: '?ms' },
                { name: 'Races', value: '?rc' },
                { name: 'Soccer', value: '?sc' },
                { name: 'Survival Games', value: '?sg' },
                { name: 'SkyWars', value: '?sw' },
                { name: 'The Bridge', value: '?tb' }
            ]
        }
    ],
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let res = await require('../../../commands_src/nethergames/player')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}