const fs = require('fs');

module.exports = async (client) => {
  const categories = fs.readdirSync('./slashCommands/');

  for (const category of categories) {
    const commandFiles = fs.readdirSync(`./slashCommands/${category}`).filter(f => f.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`../slashCommands/${category}/${file}`);
      client.slashCommands.info[command.name] = command;
      client.slashCommands.post.push({
        name: command.name,
        description: command.description,
        options: command.options
      })
    }
  }
}