const fs = require('fs');

module.exports = async (client, Discord) => {
    const types = fs.readdirSync('./interactions/');

    for (const type of types) {
        switch (type) {
            case 'commands': {
                const dirs = fs.readdirSync(`./interactions/${type}/`)
                dirs.forEach(cat => {
                    const cmdFiles = fs.readdirSync(`./interactions/${type}/${cat}/`).filter(file => file.endsWith('.js'));
                    cmdFiles.forEach(cmdFile => {
                        const cmd = require(`../interactions/${type}/${cat}/${cmdFile}`)
                        client.interactions.commands[cmd.name] = {
                            name: cmd.name,
                            description: cmd.description,
                            options: cmd.options ?? [],
                            run: cmd.run
                        }
                    })
                })
            }; break;
            case 'context': {
                const kinds = fs.readdirSync(`./interactions/${type}/`);
                for (const kind of kinds) {
                    const ctxFiles = fs.readdirSync(`./interactions/${type}/${kind}`);
                    for (const ctxFile of ctxFiles) {
                        const ctx = require(`../interactions/${type}/${kind}/${ctxFile}`);
                        client.interactions.context[ctx.type][ctx.name] = {
                            name: ctx.name,
                            type: ctx.type,
                            description: ctx.description,
                            run: ctx.run
                        }
                    }
                }
            }
        }
    }
}