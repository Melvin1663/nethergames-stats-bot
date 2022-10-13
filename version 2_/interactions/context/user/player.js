const linkSchema = require('../../../schemas/link');

module.exports = {
    name: 'View Linked Player',
    type: 'user',
    description: 'Views the linked player of a Discord User',
    run: async (int, Discord, client) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let data = await linkSchema.findOne({ userID: int.targetId });
        if (!data) return int.editReply({ content: "This person didn't link a player yet.", ephemeral: true });
        if (!data.data.player) return int.editReply({ content: "This person didn't link a player yet.", ephemeral: true });
        let res = await require('../../../commands_src/nethergames/player')(Discord, client, int, [`${data.data.player}`])
        return int.editReply(res).catch(console.log)
    }
}