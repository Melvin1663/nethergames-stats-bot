const { tcpPingPort } = require('tcp-ping-port');
const defPingIco = require('../../functions/defPingIco');

module.exports = async (Discord, client, msg, args) => {
    let reg_ips = [
        { host: 'ap.nethergames.org', sits: '🇸🇬 Singapore' },
        { host: 'us.nethergames.org', sits: '🇺🇸 Vint Hills' },
        { host: 'na.nethergames.org', sits: '🇺🇸 Vint Hills' },
        { host: 'eu.nethergames.org', sits: '🇩🇪 Frankfurt/M' }
    ];

    let pings = {
        ap: null,
        us: null,
        na: null,
        eu: null
    };

    for await (let host of reg_ips.map(v => v.host)) {
        let a = Date.now();
        let ping = await tcpPingPort(host);
        if (ping?.online) pings[host.slice(0, 2)] = Date.now() - a;
    }

    let str = [];

    Object.values(pings).forEach((ms, i) => str.push(`${defPingIco(ms)} **${reg_ips[i].host.slice(0, 2).toUpperCase()}** \`${ms ? `${ms}ms` : `na`}\` (${reg_ips[i].sits})`));

    return {
        embeds: [
            new Discord.MessageEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setColor(client.color)
                .setTitle('Ping Statistics for NetherGames')
                .setThumbnail('https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
                .setDescription(str.join('\n'))
                .setFooter(`Bot Location: N. Virginia (USA)`)
                .setTimestamp()
        ]
    }
}
