const get = require('node-fetch');

module.exports = async (Discord, client, args, page) => {
    if (!page) page = 1;
    const lbType = ["credits", "factions", "game", "kdr", "kills", "parkour", "voters", "wins", "xp"];
    const lbRank = ['🥇', '🥈', '🥉', '`04`', '`05`', '`06`', '`07`',
        '`08`', '`09`', '`10`', '`11`', '`12`', '`13`', '`14`',
        '`15`', '`16`', '`17`', '`18`', '`19`', '`20`', '`21`',
        '`22`', '`23`', '`24`', '`25`', '`26`', '`27`', '`28`',
        '`29`', '`30`', '`31`', '`32`', '`33`', '`34`', '`35`',
        '`36`', '`37`', '`38`', '`39`', '`40`', '`41`', '`42`',
        '`43`', '`44`', '`45`', '`46`', '`47`', '`48`', '`49`',
        '`50`', '`51`', '`52`', '`53`', '`54`', '`55`', '`56`',
        '`57`', '`58`', '`59`', '`60`', '`61`', '`62`', '`63`',
        '`64`', '`65`', '`66`', '`67`', '`68`', '`69`', '`70`',
        '`71`', '`72`', '`73`', '`74`', '`75`', '`76`', '`77`',
        '`78`', '`79`', '`80`', '`81`', '`82`', '`83`', '`84`',
        '`85`', '`86`', '`87`', '`88`', '`89`', '`90`', '`91`',
        '`92`', '`93`', '`94`', '`95`', '`96`', '`97`', '`98`',
        '`99`', '`100`'];
    const lbScopes = ["bestStreak", "kills", "streak", "strength"];
    const exceptions = ['bb', 'bh', 'br', 'bw', 'ctf', 'duels', 'mm', 'ms', 'rc', 'sc', 'sg', 'sw', 'tb', 'tr', 'weekly'];
    const lbColumns = [
        'bb_doubles_wins',
        'bb_solo_wins',
        'bb_wins',
        'bh_wins',
        'br_wins',
        'bw_beds_broken',
        'bw_deaths',
        'bw_diamonds_collected',
        'bw_doubles_beds_broken',
        'bw_doubles_deaths',
        'bw_doubles_final_kills',
        'bw_doubles_kills',
        'bw_doubles_wins',
        'bw_emeralds_collected',
        'bw_final_kills',
        'bw_gold_collected',
        'bw_iron_collected',
        'bw_kills',
        'bw_solo_beds_broken',
        'bw_solo_deaths',
        'bw_solo_final_kills',
        'bw_solo_kills',
        'bw_solo_wins',
        'bw_squads_beds_broken',
        'bw_squads_deaths',
        'bw_squads_final_kills',
        'bw_squads_kills',
        'bw_squads_wins',
        'bw_trios_beds_broken',
        'bw_trios_deaths',
        'bw_trios_final_kills',
        'bw_trios_kills',
        'bw_trios_wins',
        'bw_wins',
        'ctf_deaths',
        'ctf_doubles_kills',
        'ctf_doubles_wins',
        'ctf_flags_collected',
        'ctf_flags_returned',
        'ctf_kills',
        'ctf_squads_kills',
        'ctf_squads_wins',
        'ctf_wins',
        'duels_arrows_shot',
        'duels_deaths',
        'duels_kills',
        'duels_losses',
        'duels_melee_hits',
        'duels_wins',
        'mm_bow_kills',
        'mm_classic_deaths',
        'mm_classic_kills',
        'mm_classic_wins',
        'mm_deaths',
        'mm_infection_deaths',
        'mm_infection_kills',
        'mm_infection_wins',
        'mm_kills',
        'mm_knife_kills',
        'mm_throw_knife_kills',
        'mm_wins',
        'ms_fails',
        'ms_successes',
        'ms_wins',
        'rc_laps',
        'rc_wins',
        'sc_goals',
        'sc_wins',
        'sg_deaths',
        'sg_kills',
        'sg_wins',
        'sw_arrows_shot',
        'sw_blocks_broken',
        'sw_blocks_placed',
        'sw_deaths',
        'sw_doubles_deaths',
        'sw_doubles_insane_deaths',
        'sw_doubles_insane_kills',
        'sw_doubles_kills',
        'sw_doubles_losses',
        'sw_doubles_normal_deaths',
        'sw_doubles_normal_kills',
        'sw_doubles_wins',
        'sw_eggs_thrown',
        'sw_epearls_thrown',
        'sw_kills',
        'sw_losses',
        'sw_solo_deaths',
        'sw_solo_insane_deaths',
        'sw_solo_insane_kills',
        'sw_solo_kills',
        'sw_solo_losses',
        'sw_solo_normal_deaths',
        'sw_solo_normal_kills',
        'sw_solo_wins',
        'sw_wins',
        'tb_arrows_shot',
        'tb_deaths',
        'tb_goals',
        'tb_kills',
        'tb_losses',
        'tb_melee_hits',
        'tb_wins',
        'tr_blocks_dropped',
        'tr_losses',
        'tr_time_record',
        'tr_wins',
        'weekly_kills',
        'weekly_wins'
    ]
    if (!args.length) return `Please specify a Leaderboard type.\n\nAvailable Leaderboard Types:\n\`${lbType.join('`\n`')}\``;

    let err
    let a = 0
    const buttons = new Discord.MessageActionRow()
        .addComponents(
            [
                new Discord.MessageButton()
                    .setStyle('PRIMARY')
                    .setEmoji(`<:arrow_left_2:876016893343973386>`)
                    .setCustomId(`lb_buttons_left_2`)
                    .setDisabled()
                ,
                new Discord.MessageButton()
                    .setStyle('PRIMARY')
                    .setEmoji('<:arrow_left:876016893226545153>')
                    .setCustomId(`lb_buttons_left`)
                    .setDisabled()
                ,
                new Discord.MessageButton()
                    .setStyle('PRIMARY')
                    .setEmoji('<:arrow_right:876016892962295840>')
                    .setCustomId(`lb_buttons_right`)
                ,
                new Discord.MessageButton()
                    .setStyle('PRIMARY')
                    .setEmoji('<:arrow_right_2:876016893402705941>')
                    .setCustomId(`lb_buttons_right_2`)
            ]
        )

    exceptions.forEach(i => {
        if (args[0].toLowerCase().startsWith(i)) return args.unshift('game')
    });
    lbScopes.forEach(i => {
        if (args[0].toLowerCase().startsWith(i)) return args.unshift('factions')
    })
    if (!lbType.includes(args[0].toLowerCase())) return `Error: Unknown Leaderboard Type \`${args[0].toLowerCase()}\`\n\nList of available Types:\n\`${lbType.join('`\n`')}\``
    if (args[0].toLowerCase() == 'game' && !args[1]) return `Please specify the Leaderboard column. List of available columns are here: <https://pastebin.com/49kDMS4G>`
    if (args[0].toLowerCase() == 'game' && !lbColumns.includes(args[1] ? args[1].toLowerCase() : 'undefined')) return `Error: Unknown Leaderboard Column \`${args[1].toLowerCase()}\`\nHere's a List of all available columns: <https://pastebin.com/49kDMS4G>`
    if (args[1] && args[0].toLowerCase() == 'factions' && !lbScopes.includes(args[1].toLowerCase() == 'beststreak' ? 'bestStreak' : args[1].toLowerCase())) return `Error: Unknown Leaderboard Scope \`${args[1]}\`\nList of available Scopes:\n\`${lbScopes.join('`\n`')}\``

    let res;

    if (args[0].toLowerCase() == 'game') {
        res = await get(`https://apiv2.nethergames.org/v1/leaderboard?type=game&column=${args[1].toLowerCase()}`, { headers: { "Authorization": client.ngKey } }).catch(e => {
            if (e.message != 'Response code 404 (Not Found)') console.log(e);
            err = e.message
        })
        if (res?.status != 200) return `Error ${res.status}: ${res.statusText}`

        res = await res.json();
    } else if (args[0].toLowerCase() == 'factions') {
        if (!args[1]) {
            res = await get(`https://apiv2.nethergames.org/v1/leaderboard?type=factions`, { headers: { "Authorization": client.ngKey } }).catch(e => {
                if (e.message != 'Response code 404 (Not Found)') console.log(e);
                err = e.message
            })
            if (!res) return 'Error: Could not fetch the specified Data';
            if (res?.status != 200) return `Error ${res.status}: ${res.statusText}`

            res = await res.json();
            setTimeout(() => {
                if (!res && a == 0) return 'Error: Request Timed Out'
            }, 5000)

            if (!res && err) {
                a++
                return `Error: ${err}`
            } else if (!res && !err) {
                a++
                return 'Error: Unknown Error'
            }
            let arr_factions = [];
            let count = 0
            for (let i of res) {
                let arr = Object.values(i)
                arr_factions.push(`${lbRank[count]} [${arr[0]}](https://portal.nethergames.org/player/${arr[0].replace(/ +/g, '%20')}) - **${parseInt(arr[2]).toLocaleString()}**`);
                count++
            }
            arr_factions = arr_factions.slice((25 * page) - 25, 25 * page)

            let embed = new Discord.MessageEmbed()
                .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
                .setTitle(`${args[1] ? `${args[0]}: ${args[1]}` : args[0]} Leaderboard`)
                .setTimestamp()
                .setColor('E5993B')
                .setDescription(arr_factions.join('\n'))
                .setFooter(`Page ${page.toString()}/4`)
            return [embed, buttons];
        }
        res = await get(`https://apiv2.nethergames.org/v1/leaderboard?type=factions&scope=${args[1].toLowerCase() == 'beststreak' ? 'bestStreak' : (args[1].toLowerCase() == 'strength' ? '' : args[1].toLowerCase())}`, { headers: { "Authorization": client.ngKey } }).catch(e => {
            if (e.message != 'Response code 404 (Not Found)') console.log(e);
            err = e.message
        })
        if (res?.status != 200) return `Error ${res.status}: ${res.statusText}`

        res = await res.json();
    } else res = await get(`https://apiv2.nethergames.org/v1/leaderboard?type=${args[0].toLowerCase()}`, { headers: { "Authorization": client.ngKey } }).catch(e => {
        if (e.message != 'Response code 404 (Not Found)') console.log(e);
        err = e.message
    })

    if (res?.status != 200) return `Error ${res.status}: ${res.statusText}`

    res = await res.json();

    setTimeout(() => {
        if (!res && a == 0) return 'Error: Request Timed Out'
    }, 5000)

    if (!res && err) {
        a++
        return `Error: ${err}`
    } else if (!res && !err) {
        a++
        return 'Error: Unknown Error'
    }

    if (res.message == 'Invalid Form Body') return 'Unknown Leaderboard'

    let arr_lb = [];
    let lb_count = 0

    for (let i of res) {
        let arr = Object.values(i)
        arr_lb.push(`${lbRank[lb_count]} [${arr[0]}](https://portal.nethergames.org/player/${arr[0].replace(/ +/g, '%20')}) - **${parseInt(arr[1]).toLocaleString()}**`);
        lb_count++
    }
    arr_lb = arr_lb.slice((25 * page) - 25, 25 * page)

    let embed = new Discord.MessageEmbed()
        .setAuthor('NetherGames Statistics', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
        .setTitle(`${args[1] && ['game', 'factions'].includes(args[0].toLowerCase()) ? `${args[0]}: ${args[1]}` : args[0]} Leaderboard`)
        .setTimestamp()
        .setColor('E5993B')
        .setDescription(arr_lb.join('\n'))
        .setFooter(`Page ${page.toString()}/4`)

    return [embed, buttons];
}