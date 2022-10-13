module.exports = async (Discord, client, msg, args) => {
    try {
        let servers = await require('../../functions/ng/servers')();
        if (servers.code != 0) return servers.msg;

        servers = await servers.json;

        if (servers.message) return `<:erroro:1001073206389649408> An Error Occured, try again later\n${servers.message}`;

        let res = null
        let found = 0
        let query = {
            battleRoyale: ['br', 'battle', 'royale', 'battleroyale'],
            bedwars: ['bw', 'bed', 'bedwars'],
            blockhunt: ['bh', 'block', 'hunt', 'blockhunt'],
            buildBattle: ['build', 'buildbattle', 'bb'],
            captureTheFlag: ['ctf', 'capture', 'flag', 'capturetheflag', 'capturethe', 'theflag'],
            creative: ['creative'],
            duels: ['duel', 'duels'],
            factions: ['factions', 'faction', 'f'],
            lobby: ['lobby', 'lobbies', 'lb'],
            mommaSays: ['ms', 'momma', 'says', 'momma says'],
            murderMystery: ['mm', 'murdermystery', 'murder', 'mystery'],
            races: ['race', 'races'],
            replay: ['replay', 'r'],
            skyBlock: ['sky', 'skyblock', 'sb'],
            skyWars: ['skywars', 'sw', 'sky'],
            soccer: ['soccer', 'sc', 'football'],
            survivalGames: ['survival', 'sg', 'survivalgames'],
            theBridge: ['thebridge', 'tb', 'bridge'],
            tntRun: ['tnt', 'run', 'tntrun', 'tr'],
            uhc: ['uhc', 'ultrahardcore', 'hardcore', 'ultra'],
            setup: ['setup']
        }

        let metaData = {
            AC: "Arcade",
            BB: "Build Battle",
            Beta: "Beta",
            BH: "Block Hunt",
            BR: "Battle Royale",
            BW: "Bedwars",
            CQ: "Conquests",
            CREATIVE: "Creative",
            REPLAY: "Replay",
            CTF: "Capture the Flag",
            DUELS: "Duels",
            FACTIONS: "Factions",
            LOBBY: "Lobby",
            MM: "Murder Mystery",
            MS: "Momma Says",
            RC: "Races",
            Replay: "Replay",
            SB: "Skyblock",
            SC: "Soccer",
            SETUP: "Setup",
            SG: "Survival Games",
            SP: "Spleef",
            SW: "SkyWars",
            TB: "The Bridge",
            TR: "TNT Run",
            UHC: "UHC",
        }

        let comps = [
            new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId(JSON.stringify({
                            cmd: 'servers',
                            do: 'filterServers'
                        }))
                        .setPlaceholder('Filter Servers')
                        .addOptions([
                            { label: 'All', value: 'all' },
                            { label: 'Bedwars', value: 'bw' },
                            { label: 'Creative', value: 'creative' },
                            { label: 'Duels', value: 'duels' },
                            { label: 'Factions', value: 'factions' },
                            { label: 'Build Battle', value: 'bb' },
                            { label: 'Block Hunt', value: 'bh' },
                            { label: 'Battle Royale', value: 'br' },
                            { label: 'Capture the Flag', value: 'ctf' },
                            { label: 'Lobby', value: 'lobby' },
                            { label: 'Murder Mystery', value: 'mm' },
                            { label: 'Momma Says', value: 'ms' },
                            { label: 'Replay', value: 'replay' },
                            { label: 'Races', value: 'races' },
                            { label: 'Survival Games', value: 'sg' },
                            { label: 'SkyBlock', value: 'sb' },
                            { label: 'SkyWars', value: 'sw' },
                            { label: 'The Bridge', value: 'tb' },
                            { label: 'UHC', value: 'uhc' },
                            { label: 'TNT Run', value: 'tr' },
                            { label: 'Setup', value: 'setup' }
                        ]),
                )
        ]

        let meta = Object.keys(metaData)
        let metaLowercase = meta.map(v => v.toLowerCase())
        let servs = []
        let total = 0
        for (let serv in servers) {
            if (metaLowercase.includes(serv)) {
                total += servers[serv].count ?? 0
                servs.push(`**${metaData[serv?.toUpperCase()] || serv?.toUpperCase()}:** **${servers[serv].count?.toLocaleString() ?? 0}**/${servers[serv].max?.toLocaleString() ?? 0}`)
            }
        }

        for (let i in query) {
            if (found != 0) { }
            else {
                if (query[i].includes(args[0])) {
                    let serverQuery = {
                        battleRoyale: 'br',
                        bedwars: 'bw',
                        blockhunt: 'bh',
                        buildBattle: 'bb',
                        captureTheFlag: 'ctf',
                        creative: 'creative',
                        duels: 'duels',
                        factions: 'factions',
                        lobby: 'lobby',
                        mommaSays: 'ms',
                        murderMystery: 'mm',
                        races: 'races',
                        replay: 'replay',
                        skyBlock: 'sb',
                        skyWars: 'sw',
                        soccer: 'sc',
                        survivalGames: 'sg',
                        theBridge: 'tb',
                        tntRun: 'tr',
                        uhc: 'uhc',
                        setup: 'setup'
                    }
                    let gameServer = servers[serverQuery[i]];
                    comps[0].components[0].options.find(o => o.value == serverQuery[i]).default = true
                    if (!gameServer) return `<:erroro:1001073206389649408> Server not found: ${args.join(' ')}`;
                    let count = 0;
                    let max = 0;
                    let subServers = []
                    for (let b in gameServer) {
                        if (typeof gameServer[b] == 'number') {
                            switch (b) {
                                case 'count': count = gameServer[b]; break;
                                case 'max': max = gameServer[b]; break;
                            }
                        } else if (typeof gameServer[b] == 'object') {
                            subServers.push({
                                name: (require('../../functions/upper')(b)).replace('Onevone', '1v1').replace('Twovtwo', '2v2'),
                                players: `**${gameServer[b]?.count.toLocaleString()}**/${gameServer[b]?.max.toLocaleString()}`
                            })
                        }
                    }
                    found++
                    res = new Discord.MessageEmbed()
                        .setColor(client.color)
                        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                        .setTitle(`NetherGames - ${metaData[serverQuery[i]?.toUpperCase()]}`)
                        .setThumbnail('https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
                        .setDescription(`**Total Players Online:** ${total?.toLocaleString()}\n**${metaData[serverQuery[i]?.toUpperCase()]} Players Online:** ${count.toLocaleString()}/${max.toLocaleString()}\n\n${subServers.map(a => `[${a.name}:](https://ngmc.co) ${a.players}`).join('\n')}`)
                        .setTimestamp()
                }
            }
        }

        if (!res && found == 0) {
            let resServers = []
            for (let i in servers) {
                resServers.push(`[${metaData[i?.toUpperCase() || i]}:](https://ngmc.co) **${servers[i].count}**/${servers[i].max}`)
            }
            res = new Discord.MessageEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setTitle(`NetherGames`)
                .setColor(client.color)
                .setThumbnail('https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
                .setDescription(`**Total Players Online:** ${total?.toLocaleString()}\n\n${resServers.join('\n')}`)
                .setTimestamp()
        } else if (!res && found != 0) return {
            embeds: [
                new Discord.MessageEmbed()
                    .setColor('RED')
                    .setDescription('<:erroro:1001073206389649408> An Unknown Error occured')
            ]
        }

        if (typeof res == 'object') return { content: 'Server found', embeds: [res], components: comps };
        else return res;
    } catch (e) {
        console.log(e);
        return `<:erroro:1001073206389649408> Oops... An error occured`
    }
}