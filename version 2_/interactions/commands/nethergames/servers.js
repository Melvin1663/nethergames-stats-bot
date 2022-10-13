module.exports = {
    name: 'servers',
    description: 'Gets Player counts for NetherGames servers',
    options: [{
        name: 'server',
        type: 'STRING',
        description: 'Specify a NetherGames server',
        required: false,
        choices: [
            { name: 'All', value: 'all' },
            { name: 'Bedwars', value: 'bw' },
            { name: 'Creative', value: 'creative' },
            { name: 'Duels', value: 'duel' },
            { name: 'Factions', value: 'factions' },
            { name: 'Build Battle', value: 'bb' },
            { name: 'Block Hunt', value: 'bh' },
            { name: 'Battle Royale', value: 'br' },
            { name: 'Capture the Flag', value: 'ctf' },
            { name: 'Lobby', value: 'lb' },
            { name: 'Murder Mystery', value: 'mm' },
            { name: 'Momma Says', value: 'ms' },
            { name: 'Replay', value: 'r' },
            { name: 'Survival Games', value: 'sg' },
            { name: 'SkyWars', value: 'sw' },
            { name: 'The Bridge', value: 'tb' },
            { name: 'UHC', value: 'uhc' },
            { name: 'TNT Run', value: 'tnt' },
            { name: 'Setup', value: 'setup' }
        ]
    }],
    category: 'nethergames',
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let res = await require('../../../commands_src/nethergames/servers')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}