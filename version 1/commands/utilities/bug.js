module.exports = {
    name: 'bug',
    description: "Use this command to report a bug in the Bot",
    usage: 'ns!bug [bug description]',
    example: ["ns!bug Picture URL's are broken"],
    cooldown: 500000,
    async execute(client, message, cmd, args, Discord) {
        if (!args.length) {
            delete client.cooldowns.get('bug')[message.author.id]
            return message.reply("Error: Please specify the Bug description")
        }
        client.users.cache.get('731765420897599519').send({
            embeds: [
                new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dyanmic: true, size: 1024 }))
                    .setColor('E5993B')
                    .setDescription(args.join(' '))
                    .setTimestamp()
                    .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, size: 1024 }))
            ]
        })
        return message.reply("Bug sent! Thank you for reporting!")
    }
}