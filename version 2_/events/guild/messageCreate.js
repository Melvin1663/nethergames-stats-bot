const prefixSchema = require('../../schemas/prefix');

module.exports = async (Discord, client, msg) => {
    if (!client.tempPrefix[msg.guild.id]) {
        let aPrefix = await prefixSchema.findOne({ guildID: msg.guild.id });
        if (!aPrefix) client.tempPrefix[msg.guild.id] = process.env.PREFIX
        else client.tempPrefix[msg.guild.id] = aPrefix.prefix
    }

    const prefix = client.tempPrefix[msg.guild.id].toLowerCase();

    if (msg.content.includes(client.user.id)) msg.channel.send(`My Prefix is \`${prefix}\`\nPrefix commands are not supported anymore. If you want to use the bot, please use slash commands instead. (Type the slash symbol)`).catch(console.log)
    if (msg.channel.id == 866597598634442765) return;

    if (!msg.guild || !msg.content.toLowerCase().startsWith(prefix)) return;
    if (!msg.guild.me.permissions.has(['SEND_MESSAGES', 'EMBED_LINKS'])) return;

    const args = msg.content.slice(prefix.length).split(/ +/g);
    const cmd = args.shift().toLowerCase();

    let command;

    if (client.commands[cmd]) command = client.commands[cmd];
    else {
        if (!command) for (let i in client.commands) {
            if (client.commands[i]?.aliases?.includes(cmd)) command = client.commands[i];
        }
    }

    if (!command) return;

    if (!["731765420897599519","512638114687352832"].includes(msg.author.id)) {
        if (!client.cooldowns.has(command.name)) {
            client.cooldowns.set(command.name, {});
        }

        const current_time = Date.now();
        const time_stamps = client.cooldowns.get(command.name);
        const cooldown_amount = (command.cooldown) * 1000;

        if (msg.author.id in time_stamps) {
            const expiration_time = time_stamps[msg.author.id] + cooldown_amount;
            if (current_time < expiration_time) {
                const time_left = (expiration_time - current_time) / 1000;
                return msg.channel.send(`Please wait **${time_left.toFixed(0)} seconds** before using this command.`).catch(console.log)
            }
        }

        time_stamps[msg.author.id] = current_time
        setTimeout(() => delete time_stamps[msg.author.id], cooldown_amount)
    }

    client.channels.fetch('933271402017079356').then(c => {
        c.send(`<:prefix:933276755437953034> ${msg.guildId}-${msg.author.id}: \`${command.name}${args.length ? ' ' + args.join(' | ') : ''}\``).catch(console.log)
    }).catch(() => console.log('[X] Msg command message not sent.'))

    try {
        command.run(Discord, client, msg, args);
    } catch (e) {
        console.log(e);
        msg.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor('RED')
                    .setDescription('Something went wrong when executing the command')
            ]
        }).catch(console.log)
    }
}
