const ngblade = require('../../schemas/ngblade');
const ChartJS = require('chart.js');
const CanvasJS = require('canvas');
const randomColor = require('../../functions/randomColor');
const interpolate = require('../../functions/interpolate');
const fs = require('fs');
const xpToLvl = require('../../functions/xpToLvl');
const linkSchema = require('../../schemas/link');
const pStatsHist = require('../../functions/ng/player stats history');

module.exports = async (Discord, client, msg, args) => {
    let types = {
        p: 'player',
        g: 'guild',
    };

    if (!args.length || args[0].startsWith('?')) {
        const links = await linkSchema.findOne({ userID: msg.member.user.id });
        if (!links) return "<:warningo:1001073452385583215> No player specified";
        if (!links.data.player) return "<:warningo:1001073452385583215> No player specified";
        args.unshift(...['p', links.data.player]);
    };

    const canvas = CanvasJS.createCanvas(852, 480);
    const ctx = canvas.getContext('2d');

    if (!args.length) return "<:helpo:1001073741897408563> Usage: `ns!graph [type] [name] ?[graph]`"
    args[0] = args[0].toLowerCase()

    let query = args[args.length - 1].startsWith('?') ? args[args.length - 1].replace('?', '').toLowerCase() : '';
    let graph_p = ['lvl', 'credits', 'xp', 'kills', 'deaths', 'kdr', 'wins', 'losses', 'wlr'];
    let graph_g = ['mbc', 'xp', 'lvl', 'pos'];
    if (!args.length) return "<:warningo:1001073452385583215> No type specified\n- `player`\n- `guild`";
    if (!['guild', 'player', 'p', 'g'].includes(args[0])) return `<:warningo:1001073452385583215> Theres no type \`${args[0]}\`\n- \`player\`\n- \`guild\``;
    if (!args[1]) return "<:warningo:1001073452385583215> No name specified";
    if (['p', 'g'].includes(args[0])) args[0] = types[args[0]];

    let c1 = `rgba(${randomColor().join(',')})`;

    let req;
    let comps = [
        new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId(JSON.stringify({
                        cmd: 'graph',
                        do: 'selectGraph',
                        data: [args[0], args.slice(1).join(' ').split(' ?')[0]]
                    }))
                    .setPlaceholder(`Choose a graph for ${args[0]} ${args.slice(1).join(' ').split(' ?')[0]}`)
                    .addOptions(args[0] == 'player' ? [
                        { label: 'Level', value: 'lvl' },
                        { label: 'Credits', value: 'credits' },
                        { label: 'Exp', value: 'xp' },
                        { label: 'Kills', value: 'kills' },
                        { label: 'Deaths', value: 'deaths' },
                        { label: 'K/DR', value: 'kdr' },
                        { label: 'Wins', value: 'wins' },
                        { label: 'Losses', value: 'losses' },
                        { label: 'W/LR', value: 'wlr' }
                    ] : [
                        { label: 'Member Count', value: 'mbc' },
                        { label: 'Exp', value: 'xp' },
                        { label: 'Level', value: 'lvl' },
                        { label: 'Position', value: 'pos' },
                    ])
            )
    ]

    let returns = {
        content: `<:erroro:1001073206389649408> The graph \`${query || ' '}\` for ${args[0]} \`${args.slice(1).join(' ').split(' ?')[0]}\` doesn't exist`,
        components: comps
    }

    if (args[0] == 'player') {
        if (!graph_p.includes(query)) return returns;
        else req = await require('../../functions/ng/player')(require('../../functions/deQ')(args.slice(1).join(' ')), { expand: false, withFactionData: false, withGuildData: false, withOnline: false, withPunishments: false, withSkinData: false, withStats: false, withVoteStatus: false });
    } else {
        if (!graph_g.includes(query)) return returns;
        else req = await require('../../functions/ng/guild')(require('../../functions/deQ')(args.slice(1).join(' ')));
    }
    if (req.code != 0) {
        if (req.code == 404) {
            let s = await require('../../functions/genButtons')(5, require('../../functions/deQ')(args.slice(1).join(' ')), args[0], 'graph', true);
            if (s.code == 0) {
                let resp = { content: `${require('../../functions/upper')(args[0])} not found: ${require('../../functions/deQ')(args.slice(1).join(' '))}` };
                if (s.json[0].components.length > 0) {
                    resp.content += '\n<:helpo:1001073741897408563> Do you mean: (Type it you lazy person)';
                    resp.components = s.json;
                };
                return resp;
            }
            return req.msg;
        } else return req.msg;
    };

    req = await req.json;

    if (req.message) return `<:erroro:1001073206389649408> An Error Occured, try again later\n${req.message}`;

    let data = await ngblade.findOne({ id: args[0] == 'player' ? req.xuid : req.id });
    if (!data) return `<:warningo:1001073452385583215> ${require('../../functions/upper')(args[0])} not found in the Database`

    let datasets = [];
    let nowHasData = 0;
    let noDataYet = false;
    let dataCount = 0;

    for (i = 1647302400000 / 86400000; i < Math.round(Date.now() / 86400000) + 1; i++) {
        datasets.push({ date: new Date(i * 86400000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }) });
    }

    data.data.forEach(d => {
        let arr = datasets.find(r => r.date == d.date)
        let index = datasets.indexOf(arr);
        if (args[0] == 'player') {
            if(datasets[index]){
            datasets[index].value = query == 'wlr' ? d.wins / d.losses : (query == 'lvl' ? xpToLvl(d.xp) : (query == 'kdr' ? d.kills / d.deaths : d[query]));
            dataCount++;
            }
        } else{
            datasets[index].value = query == 'lvl' ? xpToLvl(d.xp) : d[query];
            dataCount++;
        }
        // datasets.push(arr);
    })

    // console.log(datasets)

    if (args[0] == 'player') {
        let res = await pStatsHist(require('../../functions/deQ')(args.slice(1).join(' ')), { periodStart: 0, hour: 0 });
        if (!res.code) for (day in res.json) {
            let arr = datasets.find(r => r.date == new Date(+(day*1000)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }))
            let index = datasets.indexOf(arr);
            let d = res.json[day];
            datasets[index].value = query == 'wlr' ? d.wins.total / d.losses : (query == 'lvl' ? xpToLvl(d.xp) : (query == 'kdr' ? d.kills / d.deaths : d[query]));
            dataCount++;
        }
    }

    if (dataCount == 0) return `<:warningo:1001073452385583215> No Data for ${args[0]} \`${req.name}\`, use \`ns!track\` to track their stats!`;

    datasets.forEach((d, i) => {
        if (d.value && noDataYet == false) {
            nowHasData = i;
            noDataYet = true;
        }
    });

    datasets = datasets.slice(nowHasData);

    new ChartJS(ctx, {
        type: 'line',
        data: {
            labels: datasets.map(x => x.date),
            datasets: [
                {
                    label: `${require('../../functions/upper')(query)}`,
                    data: !interpolate(datasets.map(x => x.value)).length ? datasets.map(x => x.value) : interpolate(datasets.map(x => x.value)),
                    backgroundColor: c1,
                    borderColor: c1,
                    borderWidth: 4
                }
            ]
        }
    });

    ctx.globalCompositeOperation = 'destination-over'
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#e0e0e0';
    ctx.fill();

    let image = canvas.toBuffer();

    fs.writeFileSync(process.cwd() + '/temp/graph.png', image, 'base64');

    comps[0].components[0].options.find(v => v.value == query).default = true;

    return {
        content: `${require('../../functions/upper')(query)} Graph for ${args[0]} \`${args.slice(1).join(' ').split(' ?')[0]}\` (${datasets[0].date}-${datasets[datasets.length - 1].date})`,
        files: [{
            attachment: process.cwd() + '/temp/graph.png',
            name: `graph.png`
        }],
        components: comps
    }
}
