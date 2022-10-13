module.exports = async (Discord, client, msg, args) => {
    if (!args.length) return `<:warningo:1001073452385583215> No query specified`;

    let search = await require('../../functions/ng/search')(args.join(' '));
    if (search.code != 0) return search.msg;

    search = await search.json;

    if (search.message) return `<:erroro:1001073206389649408> An Error Occured, try again later\n${search.message}`;

    if (!search.length) return `<:warningo:1001073452385583215> No Search results found for: ${args.join(' ')}`;

    let comps = [
        new Discord.MessageActionRow()
    ];

    search.forEach(s => {
        comps[0].addComponents(
            new Discord.MessageButton()
                .setCustomId(JSON.stringify({
                    cmd: 'search',
                    do: 'stats',
                    data: [s.type, args.join(' ')]
                }))
                .setLabel(require('../../functions/upper')(s.type))
                .setStyle('PRIMARY')
        )
    });

    return {
        embeds: [
            new Discord.MessageEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setColor(client.color)
                .setTitle(`${search.length} Result${search.length == 1 ? '' : 's'} for ${args.join(' ')}`)
        ],
        components: comps
    }
}