const linkSchema = require('../../../schemas/link');

module.exports = {
    name: 'View Linked Faction',
    type: 'user',
    description: 'Views the linked faction of a Discord User',
    run: async (int, Discord, client) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let data = await linkSchema.findOne({ userID: int.targetId });
        if (!data) return int.editReply({ content: "This person didn't link a faction yet.", ephemeral: true }).catch(console.log)
        if (!data.data.guild) return int.editReply({ content: "This person didn't link a faction yet.", ephemeral: true }).catch(console.log)
        let res = await require('../../../commands_src/nethergames/factions')(Discord, client, int, [`${data.data.faction}`])
        return int.editReply(res).catch(console.log)
    }
}