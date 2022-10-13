module.exports = (Discord, client, msg) => {
    return {
        embeds: [
            new Discord.MessageEmbed()
                .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setColor(client.color)
                .setTitle('Version 2')
                .addFields(
                    {
                        name: 'General',
                        value: `**Username:** [${client.user.tag}](https://discord.com/users/${client.user.id})\n` +
                            `**Creator:** [Melvin#5155](https://discord.com/users/731765420897599519)\n` +
                            `**Language:** [JavaScript](https://javascript.com)\n` +
                            `**Run Time:** [Node v${process.versions.node}](https://nodejs.org)\n` +
                            `**Invite:** [Here](https://top.gg/bot/863712579599597578)\n` +
                            `**Support:** [Here](https://discord.gg/aMmBRAQUDD)\n` +
                            `**Code:** [Version 1](https://github.com/Melvin1663/NG-Stats-bot-V1-but-public)`,
                        inline: true
                    },
                    {
                        name: 'Numbers',
                        value: `**Version:** ${client.version}\n` +
                            `**Packages:** ${Object.keys(require('../../package.json').dependencies).length.toLocaleString()}\n` +
                            `**Servers:** ${client.guilds.cache.size.toLocaleString()}\n` +
                            `**Shards:** N/A\n` +
                            `**Uptime:** ${require('hhmmss')(client.uptime / 1000)}\n` +
                            `**Commands:** ${Object.keys(client.commands).length.toLocaleString()}\n` +
                            `**Client Ping:** \`${client.ws.ping}ms\``,
                        inline: true
                    }
                )
                .setTimestamp()
        ]
    }
}