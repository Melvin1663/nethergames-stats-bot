module.exports = {
    name: 'leaderboard',
    description: 'Search on NetherGames for Leaderboards',
    options: [
        {
            name: 'main',
            type: 'SUB_COMMAND',
            description: 'Global Leaderboards',
            options: [
                {
                    name: 'type',
                    type: 'STRING',
                    description: 'What leaderboard do you want?',
                    choices: [
                        { name: 'Credits', value: 'credits' },
                        { name: 'KDR', value: 'kdr' },
                        { name: 'Kills', value: 'kills' },
                        { name: 'Parkour', value: 'parkour' },
                        { name: 'Voters', value: 'voters' },
                        { name: 'Wins', value: 'wins' },
                        { name: 'XP', value: 'xp' }
                    ]
                }
            ]
        },
        {
            name: 'factions',
            type: 'SUB_COMMAND',
            description: 'Faction Leaderboards',
            options: [
                {
                    name: 'scope',
                    type: 'STRING',
                    required: true,
                    description: 'What factions leaderboard are we fetching today?',
                    choices: [
                        { name: 'Best Streak', value: 'bestStreak' },
                        { name: 'Kills', value: 'kills' },
                        { name: 'Streak', value: 'streak' },
                        { name: '[DEFAULT] Strength', value: 'strength' }
                    ]
                }
            ]
        },
        {
            name: 'game',
            type: 'SUB_COMMAND',
            description: 'Game Leaderboards',
            options: [
                {
                    name: 'type',
                    type: 'STRING',
                    description: 'What game?',
                    required: true,
                    choices: [
                        { name: 'Build Battle', value: 'bb' },
                        { name: 'Block Hunt', value: 'bh' },
                        { name: 'Battle Royale', value: 'br' },
                        { name: 'Bedwars', value: 'bw' },
                        { name: 'Capture the Flag', value: 'ctf' },
                        { name: 'Duels', value: 'duels' },
                        { name: 'Murder Mystery', value: 'mm' },
                        { name: 'Momma Says', value: 'ms' },
                        { name: 'Races', value: 'rc' },
                        { name: 'Soccer', value: 'sc' },
                        { name: 'Survival Games', value: 'sg' },
                        { name: 'SkyWars', value: 'sw' },
                        { name: 'The Bridge', value: 'tb' },
                        { name: 'TNT Run', value: 'tr' },
                        { name: '[Weekly] Kills', value: 'weekly_kills' },
                        { name: '[Weekly] Wins', value: 'weekly_wins' },
                    ]
                }, {
                    name: 'type2',
                    type: 'STRING',
                    description: 'What mode?',
                    required: false,
                    choices: [
                        { name: 'None', value: '' },
                        { name: 'Solo', value: 'solo' },
                        { name: 'Doubles', value: 'doubles' },
                        { name: 'Trios', value: 'trios' },
                        { name: 'Squads', value: 'squads' },
                    ]
                }, {
                    name: 'type3',
                    type: 'STRING',
                    description: 'What kind?',
                    required: false,
                    choices: [
                        { name: 'None', value: '' },
                        { name: '[BW] Beds Broken', value: 'beds_broken' },
                        { name: '[BW] Diamonds Collected', value: 'diamonds_collected' },
                        { name: '[BW] Emeralds Collected', value: 'emeralds_collected' },
                        { name: '[BW] Gold Collected', value: 'gold_collected' },
                        { name: '[BW] Iron Collected', value: 'iron_collected' },
                        { name: '[CTF] Flags Collected', value: 'flags_collected' },
                        { name: '[CTF] Flags Returned', value: 'flags_returned' },
                        { name: '[TSD] Arrows Shot', value: 'arrows_shot' },
                        { name: '[TSD] Melee Hits', value: 'melee_hits' },
                        { name: '[MM] Bow Kills', value: 'bow_kills' },
                        { name: '[MM] Classic', value: 'classic' },
                        { name: '[MM] Infection', value: 'infection' },
                        { name: '[MM] Knife Kills', value: 'knife_kills' },
                        { name: '[MM] Throw Knife Kills', value: 'throw_knife_kills' },
                        { name: '[MS] Successes', value: 'successes' },
                        { name: '[MS] Fails', value: 'fails' },
                        { name: '[RC] Laps', value: 'laps' },
                        { name: '[SC/TB] Goals', value: 'goals' },
                        { name: '[SW] Blocks Broken', value: 'blocks_broken' },
                        { name: '[SW] Blocks Placed', value: 'blocks_placed' },
                        { name: '[SW] Eggs Thrown', value: 'eggs_thrown' },
                        { name: '[SW] E Pearls Thrown', value: 'epearls_thrown' },
                        { name: '[TNT] Blocks Dropped', value: 'blocks_dropped' },
                        { name: '[TNT] Time Record', value: 'time_record' },
                    ]
                }, {
                    name: 'type4',
                    type: 'STRING',
                    description: 'Got anymore info?',
                    required: false,
                    choices: [
                        { name: 'None', value: '' },
                        { name: 'Kills', value: 'kills' },
                        { name: 'Final Kills', value: 'final_kills' },
                        { name: 'Wins', value: 'wins' },
                        { name: 'Losses', value: 'losses' },
                        { name: 'Deaths', value: 'deaths' },
                    ]
                }
            ]
        }
    ],
    category: 'nethergames',
    run: async (int, Discord, client, args) => {
        const lbScopes = ['bestStreak', 'kills', 'streak', 'strength'];
        const exceptions = ['bb', 'bh', 'br', 'bw', 'ctf', 'duels', 'mm', 'ms', 'rc', 'sc', 'sg', 'sw', 'tb', 'tr', 'weekly']
        let game = false;
        let factions = false;
        let lbArgs = []
        args.forEach((a, i) => {
            if (exceptions.includes(a)) game = true
            if (lbScopes.includes(a)) factions = true
            if (i == 0 && game == false && factions == false) return;
            else {
                if (a != '') {
                    lbArgs.push(a)
                    if (i != args.length - 1) lbArgs.push('_')
                }
            }
        })
        let resArgs = game || factions ? [] : [args[0]]
        resArgs.push(lbArgs.join(''));
        const res = await require('../../functions/command_functions/nethergames/leaderboard')(Discord, client, resArgs)
        if (!res) return await int.editReply({ content: 'Error: Unknown Error', ephemeral: true });
        if (typeof (res) == 'string') return await int.editReply({ content: res, ephemeral: true });
        else if (typeof (res) == 'object') return await int.editReply({ embeds: [res[0]], components: [res[1]] });
        else return await int.editReply({ content: 'Error: Failed to execute command', ephemeral: true });
    }
}