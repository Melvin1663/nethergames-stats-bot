module.exports = async (json, client, Discord, int) => {
    if (!json.data) return int.reply({ content: 'Player Unspecified', ephemeral: true });

    if (!int.deffered) await int.deferUpdate().catch(console.log)

    let res = await require('../../../commands_src/nethergames/player')(Discord, client, int, [json.data])
    res.content+=`\nStats Last Updated <t:${~~(Date.now()/1000)}>`;
    // if (!res.content) res.content = `Requested by ${int.user.tag}`;
    // int.editReply(res).catch(console.log)

    int.message.edit({ content: res.content, embeds: res.embeds, components: int.message.components }).catch(console.log)
}