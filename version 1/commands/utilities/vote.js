module.exports = {
    name: 'vote',
    aliases: ['v'],
    description: "Vote for me on Top.gg",
    cooldown: 5,
    async execute(client, message, cmd, args, Discord) {
        message.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setAuthor(`NetherGames Statistics`, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
                    .setTitle('Vote')
                    .setDescription(`[Click me](https://top.gg/bot/863712579599597578/vote) to vote for me on Top.gg\n` +
                        `[Click me](https://minecraftpocket-servers.com/server/36864/vote/) to vote for the NetherGames server`)
                    .setColor('E5993B')
            ]
        })
    }
}