module.exports = (Discord, client, msg, args) => {
    if (!args.length) return {
        embeds: [
            new Discord.MessageEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setColor(client.color)
                .setTitle("No XP Specified")
                .setDescription("Level = f(x) =\n" +
                "if x > 1,395 then (√(72 × x - 54,215) + 325) ÷ 18\n" +
                "else if x > 315 then √(40 × x - 7,839) ÷ 10 + 8.1\n" +
                "else if x > 0 then √(x + 9) - 3\n" +
                "else 0")
        ]
    }

    let num = parseFloat(args[0].replace(/,/g, ''));

    if (!num) return `<:erroro:1001073206389649408> ${args[0]} is not a number`;

    return {
        embeds: [
            new Discord.MessageEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setColor(client.color)
                .setTitle("<:swapo:1001076197222006804> XP to Level converter")
                .setDescription(`${num.toLocaleString()} XP is **${require('../../functions/xpToLvl')(num).toLocaleString()}** Levels`)
        ]
    }
}