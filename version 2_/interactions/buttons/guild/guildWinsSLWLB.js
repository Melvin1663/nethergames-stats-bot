
module.exports = async (json, client, Discord, int) => {
    if (!json.data) return int.reply({ content: 'The Interaction contained incomplete information', ephemeral: true });
    if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)

    let comp = int.message.components[0].components.filter(v => v.customId.includes('guildWinsSLWLB'))

    int.message.components[0].components[int.message.components[0].components.indexOf(comp[0])].disabled = true

    let res = await require('../../../commands_src/nethergames/guildwins')(Discord, client, int, [json.data])
    int.message.edit({ components: int.message.components }).catch(console.log)
    return int.editReply(res);
}