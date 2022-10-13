module.exports = async (Discord, client, int) => {
    if (!int) return;
    if (int.isCommand()) {
        if (int.channelId == '866597598634442765') return int.reply({ content: "Looks like this isn't the Correct channel to use this", ephemeral: true })
        let args = []
        int.options.data.map((x, i) => {
            if (x.type == 'SUB_COMMAND') {
                int.options.data[i].options?.map(x => args.push(x.value));
            } else {
                args.push(x.value);
            }
        })
        try {
            if (client.slashCommands.info[int.commandName]) {
                await int.deferReply()
                return client.slashCommands.info[int.commandName].run(int, Discord, client, args)
            }
        } catch (e) {
            console.log(e);
            int.reply(`Error: ${e.message}`)
        }
        return;
    }
    if (int.isButton()) {
        try {
            if (int.customId.startsWith('lb')) {
                let args = int.message.embeds[0].title.replace(' Leaderboard', '').split(': ')
                let page = parseInt(int.message.embeds[0].footer.text.slice(5, 6))
                let nPage;
                let msg = int.message
                let res;

                if (int.customId == 'lb_buttons_left_2') { res = await require('../../functions/command_functions/nethergames/leaderboard')(Discord, client, args, 1); nPage = 1; }
                else if (int.customId == 'lb_buttons_left') { res = await require('../../functions/command_functions/nethergames/leaderboard')(Discord, client, args, page - 1 == 0 ? 1 : page - 1); nPage = page - 1 == 0 ? 1 : page - 1; }
                else if (int.customId == 'lb_buttons_right') { res = await require('../../functions/command_functions/nethergames/leaderboard')(Discord, client, args, page + 1 == 5 ? 4 : page + 1); nPage = page + 1 == 5 ? 4 : page + 1; }
                else if (int.customId == 'lb_buttons_right_2') { res = await require('../../functions/command_functions/nethergames/leaderboard')(Discord, client, args, 4); nPage = 4 }
                if (!res) {
                    int.deferReply()
                    return await int.reply({ content: 'Error: Unknown Error', ephemeral: true });
                }
                if (typeof (res) == 'string') {
                    int.deferReply()
                    return await int.reply({ content: res, ephemeral: true });
                }
                else if (typeof (res) == 'object') {
                    int.deferUpdate()
                    if (nPage == 1) {
                        res[1].components[0].disabled = true;
                        res[1].components[1].disabled = true;
                        res[1].components[2].disabled = false;
                        res[1].components[3].disabled = false;
                    }
                    if ([2, 3].includes(nPage)) {
                        res[1].components[0].disabled = false;
                        res[1].components[1].disabled = false;
                        res[1].components[2].disabled = false;
                        res[1].components[3].disabled = false;
                    }
                    if (nPage == 4) {
                        res[1].components[0].disabled = false;
                        res[1].components[1].disabled = false;
                        res[1].components[2].disabled = true;
                        res[1].components[3].disabled = true;
                    }
                    return await msg.edit({ embeds: [res[0]], components: [res[1]] })
                }
                else {
                    int.deferReply()
                    return await int.reply({ content: 'Error: Failed to execute command', ephemeral: true })
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
}
