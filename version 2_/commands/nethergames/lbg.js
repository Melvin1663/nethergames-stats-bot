module.exports = {
    name: 'lbg',
    description: 'List game leaderboards for the specified type.',
    usage: 'ns!lbg [game] (mode) [type]',
    cooldown: 5,
    aliases: ['lg', 'gameleaderboard', 'gameleaderboards', 'glb'],
    run: async (Discord, client, msg, args) => {
        let res = await require('../../commands_src/nethergames/lbg')(Discord, client, msg, args)
        return msg.channel.send(res).catch(console.log)
    }
}