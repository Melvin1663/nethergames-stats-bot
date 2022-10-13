module.exports = {
    name: 'factions',
    description: 'Search on NetherGames for Factions',
    options: [{
        name: 'faction',
        type: 'STRING',
        description: 'The name of the faction you want to search for.',
        required: true,
    }],
    category: 'nethergames',
    run: async (int, Discord, client, args) => {
        const res = await require('../../functions/command_functions/nethergames/factions')(Discord, client, args)
        if (typeof (res) == 'string') return await int.editReply({ content: res, ephemeral: true }).catch(e => { int.editReply('An error occured'); console.log(e) })
        else if (typeof (res) == 'object') return await int.editReply({ embeds: [res] });
        else return await int.editReply({ content: 'Error: Failed to execute command', ephemeral: true });
    }
}