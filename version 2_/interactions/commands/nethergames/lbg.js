module.exports = {
    name: 'gameleaderboard',
    description: 'List game leaderboards for the specified type.',
    options: [
        {
            name: 'game',
            description: "The game of the leaderboard",
            type: 'STRING',
            required: true,
            choices: [
                { name: 'Block Hunt', value: 'bh' },
                { name: 'Bedwars', value: 'bw' },
                { name: 'Conquest', value: 'cq' },
                { name: 'Duels', value: 'duels' },
                { name: 'Murder Mystery', value: 'mm' },
                { name: 'Momma Says', value: 'ms' },
                { name: 'Soccer', value: 'sc' },
                { name: 'Survival Games', value: 'sg' },
                { name: 'SkyWars', value: 'sw' },
                { name: 'The Bridge', value: 'tb' }
            ]
        },
        {
            name: 'mode',
            description: "The mode of the leaderboard",
            type: 'STRING',
            required: true,
            choices: [
                { name: 'Total', value: '' },
                { name: 'Solos', value: 'solo' },
                { name: 'Doubles', value: 'doubles' },
                { name: 'Trios', value: 'trios' },
                { name: 'Squads', value: 'squads' },
                { name: 'Classic', value: 'classic' },
                { name: 'Infection', value: 'infection' }
            ]
        },
        {
            name: 'type',
            description: "The type of the leaderboard",
            type: 'STRING',
            required: true,
            choices: [
                { name: 'Wins', value: 'wins' },
                { name: 'Kills', value: 'kills' },
                { name: 'Deaths', value: 'deaths' },
                { name: 'Losses', value: 'losses' },
                { name: 'Final Kills', value: 'final_kills' },
                { name: 'Beds Broken', value: 'beds_broken' },
                { name: 'Flags Captured', value: 'flags_captured' },
                { name: 'Bow Kills', value: 'bow_kills' },
                { name: 'Knife Kills', value: 'knife_kills' },
                { name: 'Insane Kills', value: 'insane_kills' },
                { name: 'Normal Kills', value: 'normal_kills' }
            ]
        },
    ],
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let res = await require('../../../commands_src/nethergames/lbg')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}