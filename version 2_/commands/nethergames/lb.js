module.exports = {
    name: 'lb',
    description: 'List global leaderboards for the specified type.',
    usage: 'ns!leaderboard [type]',
    cooldown: 5,
    aliases: ['l', 'leaderboard', 'leaderboards'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/lb')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}