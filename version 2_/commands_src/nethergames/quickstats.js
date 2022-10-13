const xpToLvl = require("../../functions/xpToLvl");
const linkSchema = require("../../schemas/link");

module.exports = async (Discord, client, msg, args) => {
    if (!args.length) {
        const links = await linkSchema.findOne({ userID: msg.member.user.id });
        if (!links) return "<:warningo:1001073452385583215> No player specified";
        if (!links.data.player) return "<:warningo:1001073452385583215> No player specified";
        args.unshift(links.data.player);
    }

    let player = await require("../../functions/ng/player")(require("../../functions/deQ")(args.join("%20").replace(/ +/g, "%20")), { expand: false, withFactionData: false, withGuildData: false, withPunishments: false, withSkinData: false, withStats: true, withVoteStatus: false });
    if (player.code != 0) {
        if (player.code == 404) {
            let s = await require("../../functions/genButtons")(5, require("../../functions/deQ")(args.join("%20").replace(/ +/g, "%20")), "player", "player");
            if (s.code == 0) {
                let resp = { content: `Player not found: ${require("../../functions/deQ")(args.join(" "))}`, };
                if (s.json[0].components.length > 0) {
                    resp.content += "\n<:helpo:1001073741897408563> Do you mean:";
                    resp.components = s.json;
                }
                return resp;
            }
            return player.msg;
        } else return player.msg;
    }

    player = player.json;

    if (player.message) return `<:erroro:1001073206389649408> An Error Occured, try again later\n${player.message}`;

    // const mombers = {
    //     0: '<:0_:1001012366235938828>',
    //     1: '<:1_:1001012368769294436>',
    //     2: '<:2_:1001012370652536893>',
    //     3: '<:3_:1001012372581929060>',
    //     4: '<:4_:1001012374620344400>',
    //     5: '<:5_:1001012377103388702>',
    //     6: '<:6_:1001012379225702430>',
    //     7: '<:7_:1001012381280895036>',
    //     8: '<:8_:1001012382774075423>',
    //     9: '<:9_:1001012384938336317>'
    // }

    let comp = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
            .setCustomId(
                JSON.stringify({
                    cmd: "quickstats",
                    do: "viewFull",
                    data: player.name,
                })
            )
            .setLabel("See more")
            .setStyle("PRIMARY")
    )

    let embed = new Discord.MessageEmbed()
        .setAuthor(player.name, player.avatar, `https://ngmc.co/p/${encodeURIComponent(player.name)}`)
        .setColor(client.color)
        .setTitle('Player Stats')
        .setURL(`https://ngmc.co/p/${encodeURIComponent(player.name)}`)
        .addFields(
            {
                name: `<:infoo:1001034224381460480> Info`,
                value: `**Levels:** ${player.level?.toLocaleString()}` +
                    `\n**XP:** ${player.xp?.toLocaleString()}` +
                    `\n**Credits:** ${player.credits?.toLocaleString()}` +
                    `\n**Tier:** ${player.tier || 'Default'}` +
                    `\n**Ranks:** ${player.ranks?.join(', ') || 'Default'}` +
                    `\n**Guild:** ${`[${player?.guild}](https://ngmc.co/g/${player.guild?.replace(/ +/g, '%20')})` || 'Guildless'}`,
                inline: true
            },
            {
                name: '<:infoo:1001034224381460480> Numbers',
                value: `\n**Wins:** ${player.wins?.toLocaleString()}` +
                    `\n**Losses:** ${player.losses?.toLocaleString()}` +
                    `\n**W/LR:** ${player.wlr?.toLocaleString()}` +
                    `\n**Kills:** ${player.kills?.toLocaleString()}` +
                    `\n**Deaths:** ${player.deaths?.toLocaleString()}` +
                    `\n**K/DR:** ${player.kdr?.toLocaleString()}`,
                inline: true
            }
        )
        .setTimestamp()

    return { embeds: [embed], components: [comp] }
}