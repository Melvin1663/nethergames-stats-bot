module.exports = async (json, client, Discord, int) => {
    if (!json.data) return int.reply({ content: 'Player Unspecified', ephemeral: true });

    if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)

    let res = await require('../../../commands_src/nethergames/kdr')(Discord, client, int, [json.data])
    if (!res.content) res.content = `Requested by ${int.user.tag}`;
    if (res) int.editReply(res);
    let res2 = await require('../../../commands_src/nethergames/wlr')(Discord, client, int, [json.data])
    if (!res2.content) res2.content = `Requested by ${int.user.tag}`;
    if (res2) int.channel.send(res2);

    let comp = int.message.components[1].components.filter(v => v.customId.includes('showKDandWL'))

    int.message.components[1].components[int.message.components[1].components.indexOf(comp[0])].disabled = true

    int.message.edit({ components: int.message.components }).catch(console.log)
}