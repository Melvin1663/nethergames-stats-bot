module.exports = (Discord, client, msg, args) => {
    if (!args.length) return {
        embeds: [
            new Discord.MessageEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setColor(client.color)
                .setTitle("No Level Specified")
                .setDescription("XP = f(x) =\n" +
                "if x > 30 then 4.5 × x × x - 162.5 × x + 2,220\n" +
                "else if x > 15 then 2.5 × x × x - 40.5 × x + 360\n" +
                "else x × x + 6 × x")
        ]
    }

    let num = parseFloat(args[0].replace(/,/g, ''));

    if (!num) return `<:erroro:1001073206389649408> ${args[0]} is not a number`;

    return {
        embeds: [
            new Discord.MessageEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setColor(client.color)
                .setTitle("<:swapo:1001076197222006804> Level to XP converter")
                .setDescription(`${num.toLocaleString()} Levels is **${require('../../functions/lvlToXp')(num).toLocaleString()}** XP`)
        ]
    }
}