const util = require('util');
const { create } = require('sourcebin');

module.exports = {
    name: 'asynceval',
    aliases: ['ae', 'asyncevaluate'],
    description: 'Evluate Code',
    category: 'util',
    run: async (Discord, client, msg, args) => {
        if (msg.member.id !== '731765420897599519') return;
        if (!args[0]) return msg.reply('I Evaluated **nothing**');

        if (msg.member.id === '731765420897599519') {
            try {
                let code = `(async()=>{${args.join(' ')}})()`
                let time = Date.now()
                let res = util.inspect(await eval(code, { depth: 0 }));
                let time2 = Date.now()
                if (res.length > 1000) {
                    let src = await create([{ content: res, language: 'javascript' }], { title: 'Eval', description: args.join(' ') })
                    return msg.reply(`Evaluated in \`${time2 - time}ms\`\n<${src.url}>`);
                }
                return msg.reply(`Evaluated in \`${time2 - time}ms\`\n\`\`\`js\n${res}\`\`\``);
            } catch (e) {
                return msg.reply(`\`\`\`diff\n${e}\`\`\``);
            }
        }
    }
}