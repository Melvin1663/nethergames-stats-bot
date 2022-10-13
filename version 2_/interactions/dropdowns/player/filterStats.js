module.exports = async (json, client, Discord, int) => {
    if (!json.data) return int.reply({ content: 'Player Unspecified', ephemeral: true });

    if (!int.deffered && !int.replied) await int.deferUpdate().catch(console.log)

    let args = [json.data];
    args.push(int.values[0]);
    let res = await require('../../../commands_src/nethergames/player')(Discord, client, int, args)
    res.components = int.message.components;
    if (!res.content) res.content = `Requested by ${int.user.tag}`;
    return int.message.edit(res).catch(console.log)
}