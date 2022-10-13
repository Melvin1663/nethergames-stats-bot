module.exports = async (json, client, Discord, int) => {
    if (!json.data) return int.reply({ content: 'The Interaction contained incomplete information', ephemeral: true });
    if (!int.deffered && !int.replied) await int.deferUpdate().catch(console.log)

    json.data.push(`?${int.values[0]}`)

    let res = await require('../../../commands_src/nethergames/graph')(Discord, client, int, json.data)
    return int.message.edit(res).catch(console.log)
}