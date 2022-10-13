const fs = require('fs');

module.exports = async (client, Discord) => {
    const cats = fs.readdirSync('./commands/');
    for (const cat of cats) {
        const cmdFiles = fs.readdirSync(`./commands/${cat}`).filter(f => f.endsWith('.js'));
        cmdFiles.forEach(cmdFile => {
            const cmd = require(`../commands/${cat}/${cmdFile}`);
            client.commands[cmd.name] = cmd
        })
    }
}