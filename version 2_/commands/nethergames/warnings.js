module.exports = {
    name: 'warnings',
    description: 'Get a players warnings by their username or XUID.',
    usage: 'ns!warnings (player name)',
    alises: ['warns'],
    cooldown: 3,
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/warnings')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}