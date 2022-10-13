const linkSchema = require("../../schemas/link");
const ngblade = require("../../schemas/ngblade");
const getPrevMondays = require("../../functions/getPrevMondays");

module.exports = async (Discord, client, msg, args) => {
  try {
    return `<:infoo:1001034224381460480> This command has been archived`;
    //  if (!args.length) {
    //    const links = await linkSchema.findOne({ userID: msg.member.user.id });
    //    if (!links) return "<:warningo:1001073452385583215> No guild specified";
    //    if (!links.data.guild) return "<:warningo:1001073452385583215> No guild specified";
    //    args.unshift(links.data.guild);
    //  }
    // gN = await require("../../functions/deQ")(args.join(" "))

    // let guild = await require("../../functions/ng/guild")(
    //   require("../../functions/deQ")(args.join(" ")),
    //   true,
    //   true
    // );
    // if (guild.code != 0) {
    //   if (guild.code == 404) {
    //     let s = await require("../../functions/genButtons")(
    //       5,
    //       require("../../functions/deQ")(args.join(" ")),
    //       "guild",
    //       "guildwins"
    //     );
    //     if (s.code == 0) {
    //       let resp = {
    //         content: `<:erroro:1001073206389649408> Guild not found: ${require("../../functions/deQ")(
    //           args.join(" ")
    //         )}`,
    //       };
    //       if (s.json[0].components.length > 0) {
    //         resp.content += "\n<:helpo:1001073741897408563> Do you mean:";
    //         resp.components = s.json;
    //       }
    //       return resp;
    //     }
    //     return guild.msg;
    //   } else return guild.msg;
    // }

    // guild = guild.json;

    // if (guild.message)
    //   return `<:erroro:1001073206389649408> An Error Occured, try again later\n${guild.message}`;

    // let isInNGBlade = false;

    // let ngdata1 = await ngblade.findOne({ id: guild.id });
    // if (ngdata1 && ngdata1.data.length) isInNGBlade = true;
    // if (isInNGBlade == false)
    //   return `**${guild.name}** was not found in the Database`;

    // let playerList = guild.officers
    //   .map((p) => p.xuid)
    //   .concat(...guild.members.map((p) => p.xuid))
    //   .concat(...[guild.leader.xuid]);
    // let playerNames = guild.officers
    //   .map((p) => p.name)
    //   .concat(...guild.members.map((p) => p.name))
    //   .concat(...[guild.leader.name]);
    // let res = [];
    // let ngdata = await ngblade.find({ id: { $in: playerList } });
    // let dataTimestamp = 0;
    // let totalWins = 0;
    // ngdata.forEach((d) => {
    //   let name = d.data[d.data.length - 1]?.name;
    //   if (name) {
    //     let cData = d.data.find(
    //       (o) =>
    //         o.date ==
    //         getPrevMondays().toLocaleDateString("en-US", {
    //           year: "numeric",
    //           month: "short",
    //           day: "2-digit",
    //         })
    //     );
    //     if (cData) {
    //       if (!dataTimestamp) dataTimestamp = cData.time;
    //       let player = guild.officers.find((o) => o.name == name);
    //       if (!player) player = guild.members.find((o) => o.name == name);
    //       if (!player)
    //         player = guild.leader.name == name ? guild.leader : undefined;
    //       if (cData) {
    //         res.push({ name: name, value: parseInt(player.wins - cData.wins) });
    //         totalWins += player.wins - cData.wins;
    //       }
    //     }
    //   }
    // });
    // res.sort((a, b) => b.value - a.value);

    // let na = playerNames.filter((x) => !res.map((y) => y.name).includes(x));

    // return {
    //   embeds: [
    //     new Discord.MessageEmbed()
    //       .setColor(
    //         !guild.rawTag?.startsWith("Â") ? client.color : guild.tagColor
    //       )
    //       .setAuthor(
    //         client.user.username,
    //         client.user.displayAvatarURL({ dynamic: true, size: 1024 })
    //       )
    //       .setTitle(`${guild.name} - Wins Since Last Week`)
    //       .setURL(
    //         `https://ngmc.co/g/${encodeURIComponent(guild.name)}`
    //       )
    //       .setDescription(
    //         `**Monday** is the first day of the week.\n~**${totalWins}** Wins since <t:${~~(
    //           dataTimestamp / 1000
    //         )}>\n\n${res
    //           .map(
    //             (r, i) =>
    //               `\`#${
    //                 (i + 1).toString().length == 1 ? `0${i + 1}` : i + 1
    //               }\` ${r.name} - **${r.value.toLocaleString("en-US", {
    //                 minimumFractionDigits: 0,
    //                 maximumFractionDigits: 2,
    //               })}**`
    //           )
    //           .join("\n")}\n${na
    //           .map((r, i) => `\`#${i + res.length + 1}\` ${r} - **N/A**`)
    //           .join("\n")}`
    //       )
    //       .setFooter(`ns!track gm ${guild.name} if you see N/A's`)
    //       .setTimestamp(),
    //   ],
    // };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
