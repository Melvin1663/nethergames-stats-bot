const linkSchema = require("../../schemas/link");

module.exports = async (Discord, client, msg, args) => {
  try {
    if (!args.length || args[0].startsWith("?")) {
      const links = await linkSchema.findOne({ userID: msg.member.user.id });
      if (!links) return "<:warningo:1001073452385583215> No player specified";
      if (!links.data.player) return "<:warningo:1001073452385583215> No player specified";
      args.unshift(links.data.player);
    }

    let player = await require("../../functions/ng/player")(
      require("../../functions/deQ")(args.join(" ")), { expand: false, withFactionData: false, withGuildData: false, withOnline: false, withPunishments: true, withSkinData: false, withStats: false, withVoteStatus: false });
    if (player.code != 0) {
      if (player.code == 404) {
        let s = await require("../../functions/genButtons")(
          5,
          require("../../functions/deQ")(args.join(" ")),
          "player",
          "punishments"
        );
        if (s.code == 0) {
          let resp = {
            content: `Player not found: ${require("../../functions/deQ")(
              args.join(" ")
            )}`,
          };
          if (s.json[0].components.length > 0) {
            resp.content += "\n<:helpo:1001073741897408563> Do you mean:";
            resp.components = s.json;
          }
          return resp;
        }
        return player.msg;
      } else return player.msg;
    }

    player = await player.json;

    if (player.message)
      return `<:erroro:1001073206389649408> An Error Occured, try again later\n${player.message}`;

    let punishmentEmbed = new Discord.MessageEmbed()
      .setColor(client.color)
      .setAuthor(
        player.name,
        player.avatar,
        `https://ngmc.co/p/${encodeURIComponent(player.name)}`
      );

    if (!player.punishmentsNew?.length)
      punishmentEmbed
        .setTitle("0 Punishments")
        .setDescription("<:infoo:1001034224381460480> This player doesn't have any punishments **yet**");

    //Deprecated
    // const enumType = {
    //   1: "Ban",
    //   2: "Mute",
    // };

    punishmentEmbed
      .setTitle(`${player.punishmentsNew?.length.toLocaleString()} Punishment${player.punishmentsNew?.length == 1 ? "" : "s"}`)
      .setDescription(player.punishmentsNew?.length ? player.punishmentsNew?.map((p, i) => `\`${i+1}\` ${p.active ? '<:online:816205802905665547>' : '<:dnd:816205800350416967>'}${p.type[0] + p.type.slice(1).toLowerCase()} Expires ${p.permanent ? '`Never`' : `<t:${p.validUntil}:R>`} [${p.reason}](https://ngmc.co)`).join('\n') : "<:infoo:1001034224381460480> This player doesn't have any punishments **yet**")

    return { embeds: [punishmentEmbed] };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
