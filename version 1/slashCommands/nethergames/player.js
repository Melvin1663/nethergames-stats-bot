module.exports = {
    name: 'player',
    description: 'Search on NetherGames for Players',
    options: [{
        name: 'player',
        type: 'STRING',
        description: 'The IGN of the player you want to search for.',
        required: true,
    }, {
        name: 'gamemode',
        type: 'STRING',
        description: 'Optionally specify a gamemode',
        required: false,
        choices: [
            { name: 'Build Battle', value: '?bb' },
            { name: 'Block Hunt', value: '?bh' },
            { name: 'Battle Royale', value: '?br' },
            { name: 'Bedwars', value: '?bw' },
            { name: 'Capture the Flag', value: '?ctf' },
            { name: 'Duels', value: '?duels' },
            { name: 'Murder Mystery', value: '?mm' },
            { name: 'Momma Says', value: '?ms' },
            { name: 'Races', value: '?rc' },
            { name: 'Soccer', value: '?sc' },
            { name: 'Survival Games', value: '?sg' },
            { name: 'SkyWars', value: '?sw' },
            { name: 'The Bridge', value: '?tb' },
            { name: 'TNT Run', value: '?tr' }
        ]
    }],
    category: 'nethergames',
    run: async (int, Discord, client, args) => {
        const res = await require('../../functions/command_functions/nethergames/player')(Discord, client, args)
        if (!res) return await int.editReply({ content: 'Error: Unknown Error', ephemeral: true });
        if (typeof (res) == 'string') return await int.editReply({ content: res, ephemeral: true });
        else if (typeof (res) == 'object') return await int.editReply({ embeds: [res] });
        else return await int.editReply({ content: 'Error: Failed to execute command', ephemeral: true });
    }
}