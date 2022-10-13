module.exports = async (json, client, Discord, int) => {
    if (!json.data) return int.reply({ content: 'The Interaction contained incomplete information', ephemeral: true });
    if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)

    let res = await require('../../../commands_src/nethergames/punishments')(Discord, client, int, [json.data])
    
    let comp = int.message.components[0].components.filter(v => v.label == json.data);

    int.message.components[0].components[int.message.components[0].components.indexOf(comp[0])].disabled = true

    int.message.edit({ components: int.message.components }).catch(console.log)
    return int.editReply(res)
}