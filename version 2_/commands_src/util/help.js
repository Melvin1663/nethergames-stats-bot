module.exports = (Discord, client, msg, args) => {
    let aoc = []

    for (let i in client.commands) {
        if (['eval', 'asynceval', 'execute'].includes(i)) { }
        else aoc.push(client.commands[i])
    }

    const helpEmbed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setDescription(aoc.map(c => `\`${c.name}\` - ${c.description}`).join('\n'))
        .setTimestamp()

    if (!args.length) return { embeds: [helpEmbed] }
    if (aoc.filter(v => v.name == args[0].toLowerCase()).length > 0 || aoc.filter(v => v.aliases?.includes(args[0].toLowerCase())).length > 0) {
        let cmd = []
        
        cmd = aoc.filter(v => v.name == args[0].toLowerCase())
        if (!cmd.length) cmd = aoc.filter(v => v.aliases?.includes(args[0].toLowerCase()));
        if (!cmd.length) return {
            embeds: [
                new Discord.MessageEmbed()
                    .setColor('RED')
                    .setDescription(`The command \`${args[0].toLowerCase()}\` does not exist`)
            ]
        }

        cmd = cmd[0]

        return {
            embeds: [
                new Discord.MessageEmbed()
                    .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                    .setColor(client.color)
                    .setTitle(cmd.name ?? 'N/A')
                    .setDescription(`**Description: **${cmd.description ?? 'Command has no description'}\n**Cooldown: **${`${cmd.cooldown} second(s)` ?? '0 seconds'}\n**Aliases: **${`\`${cmd.aliases?.join('`, `') ?? `Command has no aliases`}\``}\n**Usage: **${cmd.usage ?? `${process.env.PREFIX}${cmd.name}`}`)
                    .setTimestamp()
                    .setFooter("[] = Required, () = Optional")
            ]
        }
    }
}