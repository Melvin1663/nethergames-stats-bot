module.exports = {
    name: 'skin',
    description: 'Gets the Skin file of a NetherGames player',
    usage: 'ns!skin (player name)',
    cooldown: 3,
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/skin')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}