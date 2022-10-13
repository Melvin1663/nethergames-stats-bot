module.exports = {
    name: 'guild',
    description: 'Search on NetherGames for Guilds',
    options: [{
        name: 'guild',
        type: 'STRING',
        description: 'The name of the guild you want to search for.',
        required: true,
    }, {
        name: 'status',
        type: 'STRING',
        description: 'Do you want to show whos online?',
        required: false,
        choices: [
            { name: 'Yes', value: '?true' },
            { name: 'No', value: '?false' }
        ]
    }],
    category: 'nethergames',
    run: async (int, Discord, client, args) => {
        const res = await require('../../functions/command_functions/nethergames/guild')(Discord, client, args)
        if (typeof (res) == 'string') return await int.editReply({ content: res, ephemeral: true });
        else if (typeof (res) == 'object') return await int.editReply({ embeds: [res] });
        else return await int.editReply({ content: 'Error: Failed to execute command', ephemeral: true });
    }
}