module.exports = { 
    name: 'invite',
    description: 'Displays Invite link and other links', 
    category: 'utilities', 
    run: async (int, Discord, client, args) => { 
        int.editReply({ embeds: [ 
            new Discord.MessageEmbed() 
                .setAuthor(`NetherGames Statistics`, client.user.displayAvatarURL({ size: 1024, dynamic: true })) 
                .setTitle('Links') 
                .setDescription(`[Click me](${client.invite}) for my Top.gg page\n` + 
                    `[Click me](https://discord.com/oauth2/authorize?client_id=863712579599597578&permissions=242666036288&scope=bot%20applications.commands) for a Direct Invite link\n` + 
                    `[Click me](https://discord.gg/aMmBRAQUDD) for NG Statistics Support Server\n` + 
                    `[Click me](https://discord.gg/ng) for NetherGames official Discord Server`) 
                .setColor('E5993B') 
            ] 
        })
    }
}