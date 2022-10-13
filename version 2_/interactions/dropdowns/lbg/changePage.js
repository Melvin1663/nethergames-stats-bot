module.exports = async (json, client, Discord, int) => {
    if (!int.values.length) return int.reply({ content: 'Turn Unspecified', ephemeral: true });
    let args = int.message.embeds[0].title.replace(' Leaderboard', '').replace('<:leaderboardo:1001059628567769228> ', '').replace(/ +/gm, '_').toLowerCase().split('_');

    let nPage;
    let msg = int.message
    let res;
    let lb_src = require('../../../commands_src/nethergames/lbg')

    res = await lb_src(Discord, client, msg, args, parseInt(int.values[0]));
    nPage = parseInt(int.values[0]);

    res.components[1].components[0].options.find(v => v.value == int.values[0]).default = true;

    if (!res) {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        return await int.editReply({ content: 'Error: Unknown Error', ephemeral: true });
    }
    if (typeof (res) == 'string') {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        return await int.editReply({ content: res, ephemeral: true });
    }
    else if (typeof (res) == 'object') {
        try {
            if (!int.deffered && !int.replied) await int.deferUpdate().catch(console.log);

            return await msg.edit(res);
        } catch (err) {
            if (!int.deffered && !int.replied)
                await int.deferReply().catch(console.log);
            int.editReply(`<:erroro:1001073206389649408> An Error Occured`);
            console.log(err);
        }
    }
    else {
        if (!int.deffered && !int.replied) await int.deferReply()
        return await int.editReply({ content: 'Error: Failed to execute command', ephemeral: true })
    }
};
