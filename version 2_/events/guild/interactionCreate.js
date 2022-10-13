module.exports = async (Discord, client, int) => {
    if (!int) return;
    if (int.isCommand()) {
        if (int.channelId == '866597598634442765') return int.reply({ content: "Looks like this isn't the Correct channel to use this", ephemeral: true })
        let args = [];
        int.options.data.map((x, i) => {
            if (x.type == 'SUB_COMMAND') {
                int.options.data[i].options?.map(x => args.push(x.value));
            } else {
                args.push(x.value);
            }
        })
        client.channels.fetch('933271402017079356').then(c => {
            c.send(`<:slash:933274244501086229> ${int.guildId}-${int.user.id}: \`${int.commandName}${args.length ? ' '+args.join(' | ') : ''}\``).catch(console.log)
        }).catch(() => console.log('[X] Slash command message not sent.'))
        try {
            if (client.interactions.commands[int.commandName]) return client.interactions.commands[int.commandName].run(Discord, client, int, args)
            else return int.reply({ content: 'Unknown command', ephemeral: true }).catch(console.log)
        } catch (e) {
            console.log(e);
            if (!int.deffered && !int.replied) int.reply(`Error: ${e.message}`).catch(console.log)
            else int.editReply(`Error: ${e.message}`).catch(console.log)
        }
        return;
    }
    if (int.isButton()) {
        let json = JSON.parse(int.customId);
        if (!json.cmd || !json.do) return int.reply("The Interaction contained incomplete information").catch(console.log)
        client.channels.fetch('933271402017079356').then(c => {
            c.send(`<:button:933280702743580733> ${int.guildId}-${int.user.id}: \`${json.cmd} -> ${json.do}${json.data ? ` | ${json.data}` : ''}\``).catch(console.log)
        }).catch(() => console.log('[X] Button message not sent.'))
        try {
            await require(`../../interactions/buttons/${json.cmd}/${json.do}`)(json, client, Discord, int)
        } catch (e) {
            console.log(e)
            if (!int.deffered && !int.replied) int.reply({ content: 'There was an error trying to execute the interaction', ephemeral: true }).catch(console.log)
            else int.editReply({ content: 'There was an error trying to execute the interaction', ephemeral: true }).catch(console.log)
        };
        return;
    }
    if (int.isContextMenu()) {
        let cmd = client.interactions.context[int.targetType.toLowerCase()][int.commandName]
        if (cmd) {
            client.channels.fetch('933271402017079356').then(c => {
                c.send(`<:context:933286617295249418> ${int.guildId}-${int.user.id}: \`${cmd.type} - ${cmd.name} -> ${int.targetId}\``).catch(console.log)
            }).catch(() => console.log('[X] Context Menu message not sent.'))
            return cmd.run(int, Discord, client);
        }
        int.reply({ content: 'Unknown command', ephemeral: true }).catch(console.log)
    }
    if (int.isSelectMenu()) {
        let json = JSON.parse(int.customId);
        if (!json.cmd || !json.do) return int.reply("The Interaction contained incomplete information").catch(console.log)
        client.channels.fetch('933271402017079356').then(c => {
            c.send(`<:dropdown:933346222733922364> ${int.guildId}-${int.user.id}: \`${json.cmd} -> ${json.do}${json.data ? ` | ${json.data}` : ''}${int.values.length ? ' ' + int.values.join(' | ') : ''}\``).catch(console.log)
        }).catch(() => console.log('[X] Select Menu message not sent.'))
        try {
            await require(`../../interactions/dropdowns/${json.cmd}/${json.do}`)(json, client, Discord, int)
        } catch (e) {
            console.log(e)
            if (!int.deffered && !int.replied) int.reply({ content: 'There was an error trying to execute the interaction', ephemeral: true }).catch(console.log)
            else int.editReply({ content: 'There was an error trying to execute the interaction', ephemeral: true }).catch(console.log)
        };
        return;
    }
}
