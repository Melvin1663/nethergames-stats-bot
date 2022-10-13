const get = require('node-fetch2');

module.exports = async (json, client, Discord, int) => {
    if (!json.data) return int.reply({ content: 'Player Unspecified', ephemeral: true });

    if (!int.deffered && !int.replied) await int.deferUpdate().catch(console.log)

    // console.log(`?${int.message.embeds[0].title.includes('Top') ? int.message.embeds[0].title.replace('Game Leaderboard Ranks (Top ', '').replace(')', '') : ''}${int.values[0]}`)
    let res = await require('../../../commands_src/nethergames/pgl')(Discord, client, int, [json.data, `?${int.message.embeds[0].title.includes('Top') ? int.message.embeds[0].title.replace('Game Leaderboard Ranks (Top ', '').replace(')', '') : ''}${int.values[0]}`])
    if (!res.content) res.content = `Requested by ${int.user.tag}`;

    int.message.components[0].components[0].options.forEach(v => v.default = false)
    int.message.components[0].components[0].options.find(v => v.value == int.values[0]).default = true

    return int.message.edit(res).catch(console.log)
}
