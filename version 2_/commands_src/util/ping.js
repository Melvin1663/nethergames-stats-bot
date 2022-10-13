const defPingIco = require('../../functions/defPingIco');

module.exports = async (Discord, client, msg, args, intNow, intLater) => {
    let ping = Math.abs(intNow - msg.createdTimestamp);
    let defPing = Math.abs(intLater - intNow);
    let rateDef = defPingIco(defPing);
    let rate = defPingIco(ping)
    let rate2 = defPingIco(client.ws.ping)
    let dbping = await testDB();
    let rate3 = defPingIco(dbping);
    let ngping = await testNG();
    let rate4 = defPingIco(ngping);
    return `${rate} \`${ping}ms\` Message\n${rateDef} \`${defPing}ms\` Defer\n${rate2} \`${client.ws.ping}ms\` Discord API\n${rate3} \`${dbping}ms\` Database\n${rate4} \`${ngping}ms\` NG API`
}

const testDB = async () => {
    const test = require('../../schemas/prefix');
    let start = Date.now()
    let res = await test.findOne({ prefix: 'ns!' });
    if (res) return Date.now() - start
}

const testNG = async () => {
    let start = Date.now()
    let res = await require('tcp-ping-port').tcpPingPort('api.ngmc.co');
    if (res?.online) return Date.now() - start
}