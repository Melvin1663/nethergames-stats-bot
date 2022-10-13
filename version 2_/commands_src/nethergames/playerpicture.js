const xpToLvl = require('../../functions/xpToLvl');
const linkSchema = require('../../schemas/link');
const ngblade = require('../../schemas/ngblade');
const canvas = require('canvas');
const shadowHex = require('../../functions/canvas/shadowColor');
const mcmd = require('../../functions/canvas/mcmd');
const playerFlags = require('../../functions/playerflags');
const shortTime = require('../../functions/shortTimeMC');

module.exports = async (Discord, client, msg, args) => {
    try {
        if (!args.length || args[0].startsWith('?')) {
            const links = await linkSchema.findOne({ userID: msg.member.user.id });
            if (!links) return "No player specified";
            if (!links.data.player) return "No player specified";
            args.unshift(links.data.player)
        }

        let requestTimerStart = Date.now();

        let player = await require('../../functions/ng/player.js')(require('../../functions/deQ.js')(args.join('%20').replace(/ +/g, '%20')), { withGuildData: true, withSkinData: false, expand: false });
        if (player.code != 0) {
            if (player.code == 404) {
                let s = await require('../../functions/genButtons.js')(5, require('../../functions/deQ.js')(args.join('%20').replace(/ +/g, '%20')), 'player', 'player');
                if (s.code == 0) {
                    let resp = { content: `Player not found: ${require('../../functions/deQ.js')(args.join(' '))}` };
                    if (s.json[0].components.length > 0) {
                        resp.content += '\nDo you mean:';
                        resp.components = s.json;
                    };
                    return resp;
                }
                return player.msg;
            } else return player.msg;
        }
        let requestTimerTime = Date.now() - requestTimerStart;

        let historyRequestTimerStart = Date.now();
        let playerStatHistory = await require('../../functions/ng/player stats history')(require('../../functions/deQ.js')(args.join('%20').replace(/ +/g, '%20')), { periodStart: ~~((Date.now() - 777600000) / 1000), hour: 0 });

        let historyRequestTimerTime = Date.now() - historyRequestTimerStart;
        player = player.json;

        if (player.message) return `An Error Occured, try again later\n${player.message}`;

        const ngdata = await ngblade.findOne({ id: player.xuid });
        let isInNGBlade = false;
        if (ngdata) isInNGBlade = true;

        const metaData = {
            AC: "Arcade",
            BB: "Build Battle",
            Beta: "Beta",
            BH: "Block Hunt",
            BR: "Battle Royale",
            BW: "Bedwars",
            CQ: "Conquests",
            Creative: "Creative",
            CTF: "Capture the Flag",
            Duels: "Duels",
            Factions: "Factions",
            Lobby: "Lobby",
            MM: "Murder Mystery",
            MS: "Momma Says",
            RC: "Races",
            Replay: "Replay",
            SB: "Skyblock",
            SC: "Soccer",
            SG: "Survival Games",
            SP: "Spleef",
            SW: "SkyWars",
            TB: "The Bridge",
            TR: "TNT Run",
            UHC: "UHC",
        }
        const meta = []
        const metaData_lowerCase = {}
        Object.keys(metaData).forEach(i => meta.push(i.toLowerCase()))
        for (let i in metaData) {
            metaData_lowerCase[i.toLowerCase()] = metaData[i]
        }

        let comps = [];

        comps.push(
            new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId(JSON.stringify({
                            cmd: 'player',
                            do: 'filterStats',
                            data: player.name
                        }))
                        .setPlaceholder('Filter Stats')
                        .addOptions([
                            { label: 'Overall', value: '?ov' },
                            { label: 'Block Hunt', value: '?bh' },
                            { label: 'Bedwars', value: '?bw' },
                            { label: 'Conquests', value: '?cq' },
                            { label: 'Duels', value: '?duels' },
                            { label: 'Murder Mystery', value: '?mm' },
                            { label: 'Momma Says', value: '?ms' },
                            { label: 'Soccer', value: '?sc' },
                            { label: 'Survival Games', value: '?sg' },
                            { label: 'SkyWars', value: '?sw' },
                            { label: 'The Bridge', value: '?tb' }
                        ]),
                )
        )

        comps.push(
            new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId(JSON.stringify({
                            cmd: 'player',
                            do: 'showAdvanced',
                            data: player.name
                        }))
                        .setLabel('Advanced')
                        .setStyle('PRIMARY'),
                )
        )

        if (player.wins > 0) comps[1].addComponents(
            new Discord.MessageButton()
                .setCustomId(JSON.stringify({
                    cmd: 'player',
                    do: 'showWinsSum',
                    data: player.name
                }))
                .setLabel('Wins')
                .setStyle('PRIMARY')
        )

        comps[1].addComponents(
            new Discord.MessageButton()
                .setCustomId(JSON.stringify({
                    cmd: 'player',
                    do: 'showKDandWL',
                    data: player.name
                }))
                .setLabel('K/D, W/L Ratio')
                .setStyle('PRIMARY')
        )

        if (player.guild) comps[1].addComponents(
            new Discord.MessageButton()
                .setCustomId(JSON.stringify({
                    cmd: 'player',
                    do: 'showGuild',
                    data: player.guild
                }))
                .setLabel(`${player.guild} Guild`)
                .setStyle('PRIMARY')
        )

        comps[1].addComponents(
            new Discord.MessageButton()
                .setCustomId(JSON.stringify({
                    cmd: 'player',
                    do: 'showSkin',
                    data: player.name
                }))
                .setLabel('Skin')
                .setStyle('PRIMARY')
                .setDisabled(!player.skinVisibility)
        )

        comps.push(
            new Discord.MessageActionRow().addComponents(
                new Discord.MessageButton()
                    .setCustomId(JSON.stringify({
                        cmd: 'player',
                        do: 'showLb',
                        data: player.name
                    }))
                    .setLabel('Global LB Ranks')
                    .setStyle('PRIMARY'),
                new Discord.MessageButton()
                    .setCustomId(JSON.stringify({
                        cmd: 'player',
                        do: 'showLbGame',
                        data: player.name
                    }))
                    .setLabel('Game LB Ranks')
                    .setStyle('PRIMARY'),
                new Discord.MessageButton()
                    .setCustomId(JSON.stringify({
                        cmd: 'player',
                        do: 'selectGraph',
                        data: ['player', player.name]
                    }))
                    .setLabel('Graphs')
                    .setStyle('DANGER')
                    .setDisabled(!isInNGBlade),
                new Discord.MessageButton()
                    .setCustomId(JSON.stringify({
                        cmd: 'player',
                        do: 'getProgress',
                        data: player.name
                    }))
                    .setLabel('Progress')
                    .setStyle('DANGER')
                    .setDisabled(!isInNGBlade && ngdata?.data?.length < 6)
            )
        )

        if (player.punishments?.length > 0) {
            if (!comps[3]) comps.push(new Discord.MessageActionRow())
            comps[3].addComponents(
                new Discord.MessageButton()
                    .setCustomId(JSON.stringify({
                        cmd: 'player',
                        do: 'showPunishments',
                        data: player.name
                    }))
                    .setLabel(`${player.punishments.length} Punishment${player.punishments.length == 1 ? '' : 's'}`)
                    .setStyle('PRIMARY')
            )
        }

        if (args[args.length - 1].startsWith('?') && args.length > 1 && args[args.length - 1].slice(1).toLowerCase() != 'ov') {
            let game = args[args.length - 1].slice(1).toLowerCase();
            let info_av_games = []
            let avGame = ['bh', 'bw', 'cq', 'duels', 'mm', 'ms', 'rc', 'sc', 'sg', 'sw', 'tb']
            avGame.forEach(i => {
                if (meta.includes(i)) info_av_games.push(`\`${i}\` - ${metaData_lowerCase[i]}`)
            })
            if (!avGame.includes(game)) return `Error: No Data for Game Code \`${game.toUpperCase()}\`\n\nPerhaps you did a typo?\n${info_av_games.join('\n')}`
            let stats = await require(`../../util/game_stats/${game}`)(client, Discord, player, client.onlineIco, client.offlineIco)

            comps[0].components[0].options.find(v => v.value == `?${game}`).default = true

            return { embeds: [stats.embed], components: comps }
        }

        let score = 0;
        let evalScore = ''

        score += player.kills / 1250;
        score += player.wins / 500;
        score += player.level / 25;
        score += player.credits / 750;

        score = Math.round(score)

        if (score == 0) evalScore = '§4Horrible';
        else if (score <= 10) evalScore = '§cBad';
        else if (score <= 20) evalScore = '§6Casuals';
        else if (score <= 40) evalScore = '§gAverage';
        else if (score <= 60) evalScore = '§eGood';
        else if (score <= 80) evalScore = '§2Nice';
        else if (score <= 120) evalScore = '§aEpic';
        else if (score <= 150) evalScore = '§bLegend';
        else if (score <= 220) evalScore = '§1Jesus';
        else if (score >= 221) evalScore = '§cN§6o §eL§ai§3f§be§dr';
        else evalScore = '§7No Score';

        let winsData = []
        for (let i in player.winsData) {
            if (player.winsData[i]) winsData.push({ game: i, value: player.winsData[i] })
        }
        winsData.sort((a, b) => {
            const bandA = a.value
            const bandB = b.value

            let comparison = 0;
            if (bandA > bandB) comparison = 1;
            else if (bandA < bandB) comparison = -1;
            return comparison * -1;
        });

        let allKills = 0;
        let allDeaths = 0;
        for (keyGame in player.extraNested) {
            if (player.extraNested[keyGame].kills) allKills += player.extraNested[keyGame].kills
        }
        for (keyGame in player.extraNested) {
            if (player.extraNested[keyGame].deaths) allDeaths += player.extraNested[keyGame].deaths
        }

        let debug = false;

        const picture = canvas.createCanvas(1280, 720);
        if (debug) console.log('canvas created');
        const ctx = picture.getContext('2d');
        ctx.imageSmoothingEnabled = false
        if (debug) console.log('context created');

        const rankColors = {
            "Owner": '#d7342a',
            "Director": '#2ecc71',
            "Advisor": '#e74c3c',
            "Community": '#1bb6e5',
            "Admin": '#ff9600',
            "Dev": '#e91e63',
            "Supervisor": '#e257c0',
            "Discord": '#1abc9c',
            "Mod": '#3498db',
            "Crew": '#86f103',
            "Trainee": '#f1c40f',
            "Builder": '#065db6',
            "Designer": '#9b59b6',
            "Game Designer": '#c27c0e',
            "Media": '#11806a',
            "Partner": '#e06b00',
            "Titan": '#a71224',
            "Legend": '#02d3f0',
            "Emerald": '#41bb4b',
            "Ultra": '#df9833',
            "Youtube": '#e95959',
            "Tester": '#00aa00',
            "Muted": '#e53e3e',
            "Banned": '#e53e3e'
        }

        const tierColors = {
            silver: 7,
            gold: 6,
            guardian: 2,
            eagle: 4,
            elite: 1
        }

        let tiers = {
            0: "Default",
            5000: "Silver",
            10000: "Gold",
            20000: "Guardian",
            40000: "Eagle",
            50000: "Elite",
            default: 0,
            silver: 5000,
            gold: 10000,
            guardian: 20000,
            eagle: 40000,
            elite: 50000,
            display: ["default", "silver", "gold", "guardian", "eagle", "elite"],
            index: [0, 5000, 10000, 20000, 40000, 50000],
        };

        let startTimer = Date.now();
        ctx.drawImage(client.canvas.backgrounds.lobby, 0, 0, 1280, 720);
        if (debug) console.log('paint background');

        if (debug) console.log('start of panel background construction');
        // ctx.beginPath();
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        // First Panel - Player Avatar, Name, and Display Ranks
        ctx.fillRect(18, 18, 1240, 184);
        ctx.fillRect(26, 26, 1224, 168);
        // Second Panel - Player Status, Last Location, First & Last Login
        ctx.fillRect(18, 210, 1240, 50);
        ctx.fillRect(26, 218, 1224, 34);
        // Third Panel - Player Lobby Display Name
        ctx.fillRect(18, 268, 1240, 50);
        ctx.fillRect(26, 276, 1224, 34);
        // Fourth Panel - Misc
        ctx.fillRect(18, 326, 616, 362);
        ctx.fillRect(26, 334, 600, 346);
        // Fifth Panel - Player Stats
        ctx.fillRect(642, 326, 616, 362);
        ctx.fillRect(650, 334, 600, 346);
        // Sixth Panel - Misc > Weekly Stats
        ctx.fillRect(34, 440, 227, 232);
        // Seventh Panel - Misc > Statuses
        ctx.fillRect(389, 440, 229, 232);
        // ctx.stroke();
        // ctx.closePath();
        if (debug) console.log('end of panel background construction')

        if (debug) console.log('start of watermark');

        ctx.fillStyle = 'rgba(53, 58, 77, 0.5)';

        ctx.beginPath();
        let wmStartX = 1185;
        ctx.moveTo(wmStartX, 0);
        ctx.lineTo(wmStartX, 100);
        ctx.lineTo(wmStartX + 38, 75);
        ctx.lineTo(wmStartX + 75, 100);
        ctx.lineTo(wmStartX + 75, 0);
        ctx.fill();
        ctx.closePath();

        ctx.textAlign = 'center';
        mcmd('§6Public Beta Release§r Coded by §dMelvin#5155 §c<3', ctx, 1280 / 2, 710, 'Mojang', 18);
        ctx.drawImage(client.canvas.watermark.ns_icon_transparent, wmStartX + 3, 1, 70, 70);
        if (debug) console.log('end of watermark');

        if (debug) console.log('start of rounded avatar')
        let avatar = await canvas.loadImage(`https://api.ngmc.co/v1/players/${player.name.replace('%20')}/avatar`);
        let skinPreview = await canvas.loadImage(`https://api.ngmc.co/v1/players/${player.name.replace('%20')}/skin`)
        // ctx.save();
        // roundedImage(40, 40, 140, 140, 15, ctx);
        // ctx.clip();
        ctx.drawImage(avatar, 40, 40, 140, 140);
        // ctx.restore();
        if (debug) console.log('end of rounded avatars')

        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'end';
        ctx.fillText('Background by AdminRAT', 1277, 717);
        if (debug) console.log('filled text')
        ctx.textAlign = 'start';
        ctx.fillText(`NG Statistics | v${client.version} (${client.codeName})`, 3, 717);
        if (debug) console.log('filled text')

        // ctx.drawImage(skinRender, 0, 0, 312, 512);

        // ctx.shadowColor = "#404040";
        ctx.shadowColor = shadowHex(ctx.fillStyle, 25)
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;

        let displayRanks = [...player.ranks];

        if (player.muted) displayRanks.unshift('Muted');
        if (player.banned) displayRanks.unshift('Banned');

        ctx.textAlign = 'start'
        ctx.font = '55px Minecraftory';
        ctx.fillStyle = player.name ? (displayRanks.length ? rankColors[displayRanks[0]] || '#ffffff' : '#ffffff') : '#ffffff';

        ctx.fillText(player.name, 200, 110);
        if (debug) console.log('filled player name text')

        ctx.font = '40px "Mojang Bold"';

        let rankPos = 202;

        !displayRanks.length ? displayRanks.push('Default') : null;

        if (debug) console.log('displaying ranks')
        displayRanks.forEach(e => {
            ctx.fillStyle = rankColors[e] || '#ffffff';
            ctx.shadowColor = shadowHex(ctx.fillStyle, 15);
            ctx.fillText(`${e.toUpperCase()}`, rankPos, 165);
            rankPos += ctx.measureText(`${e.toUpperCase()}`).width + 10;
        })
        if (debug) console.log('done displaying ranks')

        if (debug) console.log('displaying status')
        let Panel2Y = 244;

        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        let status1 = mcmd(`${player.online ? '§2Online' : '§cOffline'}§r §7- §f${player.online ? 'Playing' : 'Last Seen'} on ${playerFlags(player.flags).hideLastServer ? '*********' : player.lastServerParsed.pretty.replace('Factions', 'FAC')} §7• §3${new Date((player.lastJoined * 1000) + (new Date().getTimezoneOffset() * 60000)).toLocaleString()} §7-§r ${shortTime((Date.now() - (player.lastJoined * 1000)) / 1000, 1, 3, null, '§7', ' ')} §rago`, ctx, 64, Panel2Y, 'Mojang', 26);
        ctx.beginPath();
        ctx.arc(45, Panel2Y - 9, 11, 0, 2 * Math.PI);
        ctx.fillStyle = player.online ? 'rgb(0, 170, 0)' : 'rgb(255, 85, 85)';
        ctx.fill();
        ctx.closePath();
        ctx.textAlign = 'end';
        // let status2 = mcmd(`§r(${shortTime((Date.now()-(player.lastJoined*1000))/1000, 1, 3, undefined, '§7')} §rago)`, ctx, 1245, Panel2Y, 'Mojang', 26);
        ctx.textAlign = 'center';
        // let x = (34 + status1.width) + (((1244 - status2.width) - (34 + status1.width)) / 2);
        // mcmd(`§6(GMT)`, ctx, x, Panel2Y, 'Mojang', 26);
        if (debug) console.log('done displaying status')

        if (debug) console.log('displaying lobby display name')
        let Panel3Y = Panel2Y + 58;
        ctx.textAlign = 'start'
        let dn1 = mcmd(`${player.formattedLevel}${player.tier ? ` §l§${tierColors[player.tier.toLowerCase()] || '§f'}${player.tier.toUpperCase()}` : ''} `, ctx, 34, Panel3Y, 'Mojang', 26);

        let dn11 = 34 + dn1.width;

        if (player.ranks.length) {
            ctx.font = '26px "Mojang Bold"';
            ctx.fillStyle = rankColors[player.ranks[0]] || '#FFFFFF';
            ctx.shadowColor = shadowHex(ctx.fillStyle, 15);
            ctx.fillText(player.ranks[0].toUpperCase() + ' ', 34 + dn1.width, Panel3Y);
            dn11 += ctx.measureText(player.ranks[0].toUpperCase() + ' ').width;
        }

        let headerY = Panel3Y + 60;

        mcmd(`§${player.staff ? 'b' : 'e'}${player.name}${player.guildData?.rawTag ? ` §l${player.guildData?.rawTag?.slice(1)}` : ''} §r§l» §r§3${new Date((player.firstJoined * 1000) + (new Date().getTimezoneOffset() * 60000)).toLocaleString()} §7-§r ${shortTime((Date.now() - (player.firstJoined * 1000)) / 1000, 1, 3, null, '§7', ' ')} §rago`, ctx, dn11, Panel3Y, 'Mojang', 26);
        if (debug) console.log('done displaying lobby display name')

        if (debug) console.log('drawing header text')
        ctx.textAlign = 'center';
        mcmd('§lMisc', ctx, 26 + (598 / 2), headerY, 'Mojang', 32);
        mcmd('§lStatistics', ctx, 650 + (598 / 2), headerY, 'Mojang', 32)
        if (debug) console.log('done drawing text header')

        if (debug) console.log('displaying stats')
        ctx.textAlign = 'left';
        let leftWallMargin = 642 + 16;
        let rightWallMargin = 1258 - 16;
        let ceilingMargin = headerY + 30;
        let key = `§b`;
        let value = '§r';
        let na = '§8';
        let curY = ceilingMargin;
        let curY2 = ceilingMargin;
        let lineSpacing = 28;

        mcmd(`${key}XP§7: ${typeof player.xp == 'number' ? value + player.xp?.toLocaleString() : `${na}N/A`}`, ctx, leftWallMargin, curY, 'Mojang', 26);
        curY += lineSpacing;
        mcmd(`${key}Kills§7: ${typeof player.kills == 'number' ? value + player.kills?.toLocaleString() : `${na}N/A`}`, ctx, leftWallMargin, curY, 'Mojang', 26);
        curY += lineSpacing;
        mcmd(`${key}Deaths§7: ${typeof player.deaths == 'number' ? value + player.deaths?.toLocaleString() : `${na}N/A`}`, ctx, leftWallMargin, curY, 'Mojang', 26);
        curY += lineSpacing;
        mcmd(`${key}Wins§7: ${typeof player.wins == 'number' ? value + player.wins?.toLocaleString() : `${na}N/A`}`, ctx, leftWallMargin, curY, 'Mojang', 26);
        curY += lineSpacing;
        mcmd(`${key}Losses§7: ${typeof player.losses == 'number' ? value + player.losses?.toLocaleString() : `${na}N/A`}`, ctx, leftWallMargin, curY, 'Mojang', 26);
        curY += lineSpacing;
        mcmd(`${key}Credits§7: ${typeof player.credits == 'number' ? value + player.credits?.toLocaleString() : `${na}N/A`}`, ctx, leftWallMargin, curY, 'Mojang', 26);
        curY += lineSpacing;
        mcmd(`${key}Guild§7: ${player.guild ? (player?.guildData?.rawTag?.slice(0, 3).slice(1) || value) + player.guild : `${na}N/A`}`, ctx, leftWallMargin, curY, 'Mojang', 26);
        curY += lineSpacing;
        mcmd(`${key}Faction§7: ${player.factionData && player.factionData?.faction ? value + player.factionData.faction.name : `${na}N/A`}`, ctx, leftWallMargin, curY, 'Mojang', 26);
        curY += lineSpacing;
        mcmd(`${key}Mains§7: ${winsData[0] ? value + metaData[winsData[0]?.game] || `${na}N/A` : `${na}N/A`}`, ctx, leftWallMargin, curY, 'Mojang', 26);
        curY += lineSpacing;
        mcmd(`${key}Vote Status§7: ${typeof player.voteStatus == 'number' ? player.voteStatus == 0 ? "§cNot Voted" : player.voteStatus == 1 ? "§6Unclaimed Vote" : player.voteStatus == 2 ? "§aClaimed Vote" : `${na}N/A` : `${na}N/A`}`, ctx, leftWallMargin, curY, 'Mojang', 26);
        curY += lineSpacing;
        mcmd(`${key}Est Score§7: §r(${Math.round(score)}) ${evalScore}`, ctx, leftWallMargin, curY, 'Mojang', 26)

        ctx.textAlign = 'end';

        mcmd(`${key}All Kills§7: ${typeof allKills == 'number' ? value + allKills?.toLocaleString() : `${na}N/A`}`, ctx, rightWallMargin, curY2, 'Mojang', 26);
        curY2 += lineSpacing;
        mcmd(`${key}All Deaths§7: ${typeof allDeaths == 'number' ? value + allDeaths?.toLocaleString() : `${na}N/A`}`, ctx, rightWallMargin, curY2, 'Mojang', 26);
        curY2 += lineSpacing;
        mcmd(`${key}K/DR§7: ${typeof player.kills == 'number' && typeof player.deaths == 'number' ? value + (!player.deaths ? 0 : player.kills / player.deaths)?.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : `${na}N/A`}`, ctx, rightWallMargin, curY2, 'Mojang', 26);
        curY2 += lineSpacing;
        mcmd(`${key}AK/ADR§7: ${typeof allKills == 'number' && typeof allDeaths == 'number' ? value + (!allDeaths ? 0 : allKills / allDeaths)?.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : `${na}N/A`}`, ctx, rightWallMargin, curY2, 'Mojang', 26);
        curY2 += lineSpacing;
        mcmd(`${key}W/LR§7: ${typeof player.wins == 'number' && typeof player.losses == 'number' ? value + (!player.losses ? 0 : player.wins / player.losses)?.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : `${na}N/A`}`, ctx, rightWallMargin, curY2, 'Mojang', 26);
        curY2 += lineSpacing;
        mcmd(`${key}W/DR§7: ${typeof player.wins == 'number' && typeof player.deaths == 'number' ? value + (!player.deaths ? 0 : player.wins / player.deaths)?.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : `${na}N/A`}`, ctx, rightWallMargin, curY2, 'Mojang', 26);
        curY2 += lineSpacing;
        mcmd(`${key}Kill Rate§7: ${typeof player.kills == 'number' && typeof player.deaths == 'number' ? value + Math.round((player.kills / (player.kills + player.deaths)) * 100) + '%' : `${na}N/A`}`, ctx, rightWallMargin, curY2, 'Mojang', 26);
        curY2 += lineSpacing;
        mcmd(`${key}Death Rate§7: ${typeof player.kills == 'number' && typeof player.deaths == 'number' ? value + Math.round((player.deaths / (player.kills + player.deaths)) * 100) + '%' : `${na}N/A`}`, ctx, rightWallMargin, curY2, 'Mojang', 26);
        curY2 += lineSpacing;
        mcmd(`${key}Win Rate§7: ${typeof player.wins == 'number' && typeof player.losses == 'number' ? value + Math.round((player.wins / (player.wins + player.losses)) * 100) + '%' : `${na}N/A`}`, ctx, rightWallMargin, curY2, 'Mojang', 26);
        curY2 += lineSpacing;
        mcmd(`${key}Lose Rate§7: ${typeof player.wins == 'number' && typeof player.losses == 'number' ? value + Math.round((player.losses / (player.wins + player.losses)) * 100) + '%' : `${na}N/A`}`, ctx, rightWallMargin, curY2, 'Mojang', 26);
        // curY2 += lineSpacing;
        // mcmd(`${key}Active§7: ${(player.lastJoined > (Date.now() - 1296000000) / 1000) ? '§aYes' : '§cNo'}`, ctx, rightWallMargin, curY2, 'Mojang', 26);
        // curY2 += lineSpacing;
        // mcmd(`${key}Staff§7: ${typeof player.staff == 'boolean' ? (player.staff ? '§aYes' : '§cNo') : `${na}N/A`}`, ctx, rightWallMargin, curY2, 'Mojang', 26);
        // curY2 += lineSpacing;
        // mcmd(`${key}Location§7: ${!playerFlags(player.flags).hideLastServer ? '§aPublic' : '§cPrivate'}`, ctx, rightWallMargin, curY2, 'Mojang', 26);
        // curY2 += lineSpacing;
        ctx.textAlign = 'left';

        if (debug) console.log('done displaying stats');

        if (debug) console.log('generating misc');

        require('../../functions/canvas/renderSkin')(player.skinVisibility ? skinPreview : client.canvas.skins.unknown, 7, ctx, (26 + (598 / 2)) - (112 / 2), 440);

        ctx.textAlign = 'center';
        let curLvl = mcmd(player.formattedLevel.replaceAll('§l', ''), ctx, 26 + (598 / 2), 425, 'Minecraftory', 48)

        if (!player.skinVisibility) {
            let dispTxt;
            if (player.skinVisibility == false) dispTxt = 'HIDDEN';
            else dispTxt = '?????';
            ctx.shadowColor = 'rgba(0, 0, 0, 0)';
            ctx.fillStyle = 'rgba(255, 0, 0, 1)';
            ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
            ctx.lineWidth = 5;

            ctx.save();

            ctx.translate((26 + (598 / 2) - (112 / 2) - 18) + 0.5 * (112 + 36), 510 + 0.5 * 40);
            ctx.rotate((Math.PI / 180) * -20);
            ctx.translate(-((26 + (598 / 2) - (112 / 2) - 18) + 0.5 * (112 + 36)), -(510 + 0.5 * 40));

            ctx.strokeRect(26 + (598 / 2) - (112 / 2) - 18, 510, 112 + 36, 40);
            mcmd('§4' + dispTxt, ctx, 26 + (598 / 2), 540, 'Mojang', 30);

            ctx.restore();
        }

        ctx.textAlign = 'left';
        leftWallMargin = 18 + 16;
        rightWallMargin = 616;
        let barMargin = 8;

        ctx.textAlign = 'right';
        ctx.strokeStyle = 'rgb(236, 154, 53)';
        ctx.lineWidth = 2;
        let nextTier = tiers[tiers.display[tiers.index.indexOf(tiers[(player.tier || "Default").toLowerCase()]) + 1]];
        let credsLeft = nextTier - player.credits;
        let bar1X = 35;
        let bar1Width = (598 / 2) - curLvl.width / 2 - barMargin - 35;
        let bar2X = (26 + (598 / 2)) + (curLvl.width) + barMargin;
        let bar2Width = (rightWallMargin - barMargin) - barMargin - ((17 + (598 / 2)) + (curLvl.width));
        ctx.strokeRect(bar2X, 398, bar2Width, 7);
        ctx.strokeRect(bar1X, 398, bar1Width, 7);
        let percentToNextLvl = ((xpToLvl(player.xp) - player.level) / (player.level + 1 - player.level));
        let percentToNextTier = ((player.credits - tiers[player.tier?.toLowerCase() || "default"]) / (player.credits - tiers[player.tier?.toLowerCase() || "default"] + credsLeft))

        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        ctx.shadowColor = 'rgba(0,0,0,0)';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(bar2X, 402);
        ctx.lineTo(bar2X + percentToNextLvl * bar2Width, 402);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(bar1X, 402);
        ctx.lineTo(bar1X + percentToNextTier * bar1Width, 402);
        ctx.stroke();
        ctx.closePath();

        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.textAlign = 'center';
        mcmd(`§6Next Level`, ctx, bar2X + bar2Width / 2, 373, 'Mojang', 20);
        mcmd(`§6Next Tier`, ctx, bar1X + bar1Width / 2, 373, 'Mojang', 20);
        mcmd(`§6${~~(percentToNextLvl * 100)}%`, ctx, bar2X + bar2Width / 2, 393, 'Mojang', 20);
        mcmd(`§6${~~(percentToNextTier * 100)}%`, ctx, bar1X + bar1Width / 2, 393, 'Mojang', 20);
        mcmd(`§6${player.xpToNextLevel?.toLocaleString()} XP §7Left`, ctx, bar2X + bar2Width / 2, 424, 'Mojang', 20);
        mcmd(`§6${credsLeft?.toLocaleString()} Credits §7Left`, ctx, bar1X + bar1Width / 2, 424, 'Mojang', 20);

        mcmd('§lWeekly', ctx, 34 + (227 / 2), 465, 'Mojang', 26);
        mcmd('§lStatuses', ctx, 389 + (229 / 2), 465, 'Mojang', 26)

        ctx.textAlign = 'left';
        let curY3 = 502;
        leftWallMargin = 42;
        lineSpacing = 27;

        let up = '§a';
        let down = '§c';
        let noc = '§7';

        if (playerStatHistory.code == 0 && Object.keys(playerStatHistory.json).length > 7) {
            playerStatHistory = playerStatHistory.json;
            let statsHistArr = [];
            for (point in playerStatHistory) {
                statsHistArr.push(playerStatHistory[point]);
            }
            let from = statsHistArr[statsHistArr.length - 8];
            let weeklyWins = player.wins - from.wins.total;
            let weeklyWLR = ((player.wins / player.losses) - (from.wins.total / from.losses));
            let weeklyKills = player.kills - from.kills;
            let weeklyKDR = ((player.kills / player.deaths) - (from.kills / from.deaths));
            let weeklyDeaths = player.deaths - from.deaths;
            let weeklyCredits = player.credits - from.credits;
            let weeklyXP = player.xp - from.xp;
            mcmd(`${key}Wins§7: ${weeklyWins == 0 ? noc : (weeklyWins > 0 ? up : down)}${weeklyWins?.toLocaleString()}`, ctx, leftWallMargin, curY3, 'Mojang', 26);
            curY3 += lineSpacing;
            mcmd(`${key}W/LR§7: ${weeklyWLR == 0 ? noc : (weeklyWLR > 0 ? up : down)}${weeklyWLR.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`, ctx, leftWallMargin, curY3, 'Mojang', 26);
            curY3 += lineSpacing;
            mcmd(`${key}Kills§7: ${weeklyKills == 0 ? noc : (weeklyKills > 0 ? up : down)}${weeklyKills?.toLocaleString()}`, ctx, leftWallMargin, curY3, 'Mojang', 26);
            curY3 += lineSpacing;
            mcmd(`${key}Deaths§7: ${weeklyDeaths == 0 ? noc : (weeklyDeaths < 0 ? up : down)}${weeklyDeaths?.toLocaleString()}`, ctx, leftWallMargin, curY3, 'Mojang', 26);
            curY3 += lineSpacing;
            mcmd(`${key}K/DR§7: ${weeklyKDR == 0 ? noc : (weeklyKDR > 0 ? up : down)}${weeklyKDR.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`, ctx, leftWallMargin, curY3, 'Mojang', 26);
            curY3 += lineSpacing;
            mcmd(`${key}Credits§7: ${weeklyCredits == 0 ? noc : (weeklyCredits > 0 ? up : down)}${weeklyCredits?.toLocaleString()}`, ctx, leftWallMargin, curY3, 'Mojang', 26);
            curY3 += lineSpacing;
            mcmd(`${key}XP§7: ${weeklyXP == 0 ? noc : (weeklyXP > 0 ? up : down)}${weeklyXP?.toLocaleString()}`, ctx, leftWallMargin, curY3, 'Mojang', 26);
            curY3 += lineSpacing;
        } else {
            ctx.textAlign = 'center';
            mcmd(`N/A\nCheck again\nin max 7 days`, ctx, 34 + (227 / 2), 440 + (232 / 2), 'Mojang', 26);
        }

        curY3 = 502;
        leftWallMargin = 397;
        ctx.textAlign = 'center';
        if (ctx.textAlign == 'center') leftWallMargin = leftWallMargin += (229 / 2) - 8;
        mcmd(`${(player.lastJoined > (Date.now() - 1296000000) / 1000) ? `${up}Active` : `${down}Inactive`}`, ctx, leftWallMargin, curY3, 'Mojang', 26);
        curY3 += lineSpacing;
        mcmd(`${player.banned ? `${down}Banned` : `${up}Unbanned`}`, ctx, leftWallMargin, curY3, 'Mojang', 26);
        curY3 += lineSpacing;
        mcmd(`${player.muted ? `${down}Muted` : `${up}Unmuted`}`, ctx, leftWallMargin, curY3, 'Mojang', 26);
        curY3 += lineSpacing;
        mcmd(`${player.staff ? `${up}Staff` : `${down}Not Staff`}`, ctx, leftWallMargin, curY3, 'Mojang', 26);
        curY3 += lineSpacing;
        mcmd(`${player.skinVisibility ? `${up}Public Skin` : `${down}Private Skin`}`, ctx, leftWallMargin, curY3, 'Mojang', 26);
        curY3 += lineSpacing;
        mcmd(`${playerFlags(player.flags).hideLastServer ? `${down}Private Location` : `${up}Public Location`}`, ctx, leftWallMargin, curY3, 'Mojang', 26);
        curY3 += lineSpacing;
        mcmd(`${playerFlags(player.flags).quarantine ? `${down}Blacklisted` : `${up}Whitelisted`}`, ctx, leftWallMargin, curY3, 'Mojang', 26);
        curY3 += lineSpacing;

        if (debug) console.log('generated misc');

        let timeToMakeImage = Date.now() - startTimer;
        let imageDataURL = picture.toDataURL();
        let head = 'data:image/png;base64,';
        let approxImageSize = Math.round((imageDataURL.length - head.length) * 3 / 4) / 1024;
        if (debug) console.log(`done ${timeToMakeImage}ms`)

        return {
            content: `✨ Debug ✨\nPlayer: ${player.name} (${player.xuid})\nImage Rendering: \`${timeToMakeImage} MS\` (Canvas JS)\nImage Size: \`${approxImageSize} KB\` (1280x720)\nRequest Size: \`${JSON.stringify(player).length / 1024} KB\` (WithGuildData)\nRequest Time: \`${requestTimerTime} MS\`\nHistory Request Size: \`${JSON.stringify(playerStatHistory)?.length / 1024} KB\` (GMT)\nHistory Request Time: \`${historyRequestTimerTime} MS\``,
            files: [{
                attachment: picture.toBuffer(),
                name: `${player.name}.png`,
                description: `${player.name}'s Global Statistics on the NetherGames Network`
            }],
            // components: comps
        }
    } catch (e) {
        console.log(e);
        return `Oops... An error occured`
    }
}
