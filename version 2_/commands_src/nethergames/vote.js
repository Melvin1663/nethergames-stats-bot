module.exports = (Discord, client, msg) => {
    return {
        embeds: [
            new Discord.MessageEmbed()
                .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setColor(client.color)
                .setTitle('Vote')
                .addFields(
                    { name: '<:topgg:923464643874283570> Vote for this Bot', value: `[Here](https://top.gg/bot/863712579599597578/vote)`, inline: true },
                    { name: '<:NG:890036495681982475> Vote for NG Server', value: `[Here](https://ngmc.co/vote)`, inline: true }
                )
        ]
    }
}