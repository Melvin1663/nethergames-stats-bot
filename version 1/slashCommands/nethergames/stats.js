module.exports = {
    name: 'stats',
    description: 'Shows NetherGames Overall Statistics',
    category: 'nethergames',
    run: async (int, Discord, client, args) => {
        const res = await require('../../functions/command_functions/nethergames/stats')(Discord, client)
        if (!res) return await int.editReply({ content: 'Error: Unknown Error', ephemeral: true });
        if (typeof (res) == 'string') return await int.editReply({ content: res, ephemeral: true });
        else if (typeof (res) == 'object') return await int.editReply({ embeds: [res] });
        else return await int.editReply({ content: 'Error: Failed to execute command', ephemeral: true });
    }
}