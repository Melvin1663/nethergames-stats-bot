module.exports = {
    name: 'nextguildtag',
    description: 'Calculate the next tag of a guild',
    usage: 'ns!nextguildlevel (guild name) (tag)',
    cooldown: 3,
    aliases: ['ngt'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/nextguildtag')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}