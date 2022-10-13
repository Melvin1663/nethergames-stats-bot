module.exports = async (json, client, Discord, int) => {
    if (!json.data) return int.reply({ content: 'The Interaction contained incomplete information', ephemeral: true });
    if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)

    let res;
    if (['player', 'guild', 'faction'].includes(json.data)) res = await require(`../../../commands_src/nethergames/${json.data == 'faction' ? 'factions' : json.data}`)(Discord, client, int, int.values);
    else return int.editReply(`Type not found`).catch(console.log)
    return int.editReply(res).catch(console.log)
}