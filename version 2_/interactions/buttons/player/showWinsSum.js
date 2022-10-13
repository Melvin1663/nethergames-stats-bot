const get = require('node-fetch2');
const pb = require('../../../functions/progressBar');

module.exports = async (json, client, Discord, int) => {
    if (!json.data) return int.reply({ content: 'Player Unspecified', ephemeral: true });

    if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)

    let res = await require('../../../commands_src/nethergames/wins')(Discord, client, int, [json.data])

    if (!res.content) res.content = `Requested by ${int.user.tag}`;
    int.editReply(res).catch(console.log)

    let comp = int.message.components[1].components.filter(v => v.customId?.includes('showWinsSum'))

    int.message.components[1].components[int.message.components[1].components.indexOf(comp[0])].disabled = true

    int.message.edit({ components: int.message.components }).catch(console.log)
}
