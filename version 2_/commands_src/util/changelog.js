const changelog = require('../../changelog.json')

module.exports = (Discord, client, msg, args) => {
    if (!args.length) args[0] = client.version;
    let data = changelog[args[0]];
    if (!data) {
        args[0] = client.version
        data = changelog[args[0]];
    }
    return {
        embeds: [
            new Discord.MessageEmbed()
                .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setColor(client.color)
                .setTitle(`Version ${args[0]}`)
                .setDescription(data.description)
                .setTimestamp(new Date(data.date).getTime())
        ]
    }
}