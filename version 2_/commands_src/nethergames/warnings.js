const linkSchema = require("../../schemas/link");

module.exports = async (Discord, client, msg, args) => {
  try {
    return '<:infoo:1001034224381460480> This command has been archived'
    // if (!args.length || args[0].startsWith("?")) {
    //   const links = await linkSchema.findOne({ userID: msg.member.user.id });
    //   if (!links) return "<:warningo:1001073452385583215> No player specified";
    //   if (!links.data.player) return "<:warningo:1001073452385583215> No player specified";
    //   args.unshift(links.data.player);
    // }

    // let player = await require("../../functions/ng/player")(
    //   require("../../functions/deQ")(args.join(" ")),
    //   false,
    //   false,
    //   false,
    //   false,
    //   true
    // );
    // if (player.code != 0) {
    //   if (player.code == 404) {
    //     let s = await require("../../functions/genButtons")(
    //       5,
    //       require("../../functions/deQ")(args.join(" ")),
    //       "player",
    //       "warnings"
    //     );
    //     if (s.code == 0) {
    //       let resp = {
    //         content: `Player not found: ${require("../../functions/deQ")(
    //           args.join(" ")
    //         )}`,
    //       };
    //       if (s.json[0].components.length > 0) {
    //         resp.content += "\n<:helpo:1001073741897408563> Do you mean:";
    //         resp.components = s.json;
    //       }
    //       return resp;
    //     }
    //     return player.msg;
    //   } else return player.msg;
    // }

    // player = await player.json;

    // let warnEmbed = new Discord.MessageEmbed()
    //   .setColor(client.color)
    //   .setAuthor(
    //     player.name,
    //     player.avatar,
    //     `https://ngmc.co/p/${encodeURIComponent(player.name)}`
    //   );

    // if (!player.warnings?.length)
    //   warnEmbed
    //     .setTitle("0 Warnings")
    //     .setDescription("<:infoo:1001034224381460480> This player doesn't have any warnings **yet**");

    // warnEmbed
    //   .setTitle(
    //     `${player.warnings?.length.toLocaleString()} Warning${
    //       player.warnings.length == 1 ? "" : "s"
    //     }`
    //   )
    //   .setDescription(
    //     player.warnings?.length
    //       ? player.warnings
    //           ?.map(
    //             (w, i) =>
    //               `\`${i + 1}\` (${w.id}) <t:${new Date(
    //                 w.time
    //               ).getTime()}:d> [${w.reason}](https://ngmc.co)`
    //           )
    //           .join("\n")
    //       : `<:infoo:1001034224381460480> No warnings for **${player.name}** ||yet||`
    //   );

    // return { embeds: [warnEmbed] };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
