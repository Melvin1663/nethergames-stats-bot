module.exports = (Discord, client, msg) => {
    return {
        embeds: [
            new Discord.MessageEmbed()
                .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setTitle('Links')
                .addFields(
                    { name: 'Top.gg Page', value: `[Click me](https://top.gg/bot/863712579599597578)`, inline: true },
                    { name: 'Invite Link', value: `[Click me](https://discord.com/oauth2/authorize?client_id=863712579599597578&permissions=242666036288&scope=bot%20applications.commands)`, inline: true },
                    { name: 'Support Server', value: `[Click me](https://discord.gg/aMmBRAQUDD)`, inline: true }
                )
                .setColor('BLURPLE')
        ]
    }
}