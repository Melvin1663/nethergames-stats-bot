const linkSchema = require('../../../schemas/link');

module.exports = {
    name: 'View Linked Guild',
    type: 'user',
    description: 'Views the linked guild of a Discord User',
    run: async (int, Discord, client) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let data = await linkSchema.findOne({ userID: int.targetId });
        if (!data) return int.editReply({ content: "This person didn't link a guild yet.", ephemeral: true });
        if (!data.data.guild) return int.editReply({ content: "This person didn't link a guild yet.", ephemeral: true });
        let res = await require('../../../commands_src/nethergames/guild')(Discord, client, int, [`${data.data.guild}`])
        return int.editReply(res).catch(console.log)
    }
}