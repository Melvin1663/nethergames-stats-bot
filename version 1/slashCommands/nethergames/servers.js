module.exports = {
    name: 'servers',
    description: 'Displays Player Counts',
    options: [{
        name: 'server',
        type: 'STRING',
        description: 'Optional Server',
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
            { name: 'TNT Run', value: 'tnt' }
        ]
    }],
    category: 'nethergames',
    run: async (int, Discord, client, args) => {
        const res = await require('../../functions/command_functions/nethergames/servers')(Discord, client, args)
        if (!res) return await int.editReply({ content: 'Error: Unknown Error', ephemeral: true });
        if (typeof (res) == 'string') return await int.editReply({ content: res, ephemeral: true });
        else if (typeof (res) == 'object') return await int.editReply({ embeds: [res] });
        else return await int.editReply({ content: 'Error: Failed to execute command', ephemeral: true });
    }
}