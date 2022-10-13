module.exports = (Discord, client) => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity('NetherGames', { type: 'PLAYING' })
  client.application.commands.set(client.slashCommands.post).then(r => console.log('Slash commands are now loaded'))
}