const { execSync } = require('child_process');

module.exports = {
    name: 'execute',
    aliases: ['exec', 'exe'],
    description: 'Execute cmd commands',
    category: 'util',
    run: async (Discord, client, msg, args) => {
        if (msg.member.id !== '731765420897599519') return;
        if (!args[0]) return msg.reply('I Executed **nothing**');

        if (msg.member.id === '731765420897599519') {
            try {
                let code = args.join(' ');
                let time = Date.now()
                let res = execSync(code, { encoding: 'utf-8' });
                let time2 = Date.now()
                if (res.length > 1000) {
                    let src = await require('sourcebin').create([{ content: res, language: 'javascript' }], { title: 'Eval', description: args.join(' ') })
                    return msg.reply(`Executed in \`${time2 - time}ms\`\n<${src.url}>`);
                }
                return msg.reply(`Executed in \`${time2 - time}ms\`\n\`\`\`js\n${res}\`\`\``);
            } catch (e) {
                return msg.reply(`\`\`\`diff\n${e}\`\`\``);
            }
        }
    }
}