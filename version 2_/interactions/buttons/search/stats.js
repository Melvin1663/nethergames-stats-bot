module.exports = async (json, client, Discord, int) => {
    if (!json.data) return int.reply({ content: 'No Data specified', ephemeral: true });

    if (!int.deffered && !int.replied) await int.deferReply().catch(console.log);

    let res = await require(`../../../commands_src/nethergames/${json.data[0] == 'faction' ? 'factions' : json.data[0]}`)(Discord, client, int, [json.data[1]])

    int.editReply(res).catch(console.log);

    let comp = int.message.components[0].components.filter(v => v.label == json.data);

    int.message.components[0].components[int.message.components[0].components.indexOf(comp[0])].disabled = true

    int.message.edit({ components: int.message.components }).catch(console.log)
}