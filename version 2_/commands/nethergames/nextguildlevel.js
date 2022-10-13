module.exports = {
    name: 'nextguildlevel',
    description: 'Calculate the next level of a guild',
    usage: 'ns!nextguildlevel (guild name) (level)',
    cooldown: 3,
    aliases: ['ngl'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/nextguildlevel')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}