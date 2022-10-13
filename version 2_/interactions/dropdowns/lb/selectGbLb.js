module.exports = async (json, client, Discord, int) => {
    if (!int.deffered && !int.replied) await int.deferUpdate().catch(console.log)

    let res = await require('../../../commands_src/nethergames/lb')(Discord, client, int, int.values)
    return int.message.edit(res).catch(console.log)
}