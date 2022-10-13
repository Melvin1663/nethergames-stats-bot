const linkSchema = require("../../schemas/link");

module.exports = async (Discord, client, msg, args) => {
  try {
    if (!args.length) {
      const links = await linkSchema.findOne({ userID: msg.member.user.id });
      if (!links) return "<:warningo:1001073452385583215> No player specified";
      if (!links.data.player) return "<:warningo:1001073452385583215> No player specified";
      args.unshift(links.data.player);
    }

    let player = await require("../../functions/ng/player")(
      require("../../functions/deQ")(args.join(" ")),{ expand: false, withFactionData: false, withGuildData: false, withOnline: false, withPunishments: false, withSkinData: false, withStats: false, withVoteStatus: false });
    if (player.code != 0) {
      if (player.code == 404) {
        let s = await require("../../functions/genButtons")(
          5,
          require("../../functions/deQ")(args.join(" ")),
          "player",
          "skin"
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

    if (!player.skinVisibility)
      return `<:warningo:1001073452385583215> Oops... **${player.name}** has their skin set to private`;

    return {
      embeds: [
        new Discord.MessageEmbed()
          .setAuthor(
            player.name,
            player.avatar,
            `https://ngmc.co/p/${encodeURIComponent(
              player.name
            )}`
          )
          .setColor(client.color)
          .setTitle(`Skin File`)
          .setURL(player.skin)
          .setImage(player.skin)
          .setTimestamp(),
      ],
      components: [
        new Discord.MessageActionRow().addComponents(
          new Discord.MessageButton()
            .setStyle("LINK")
            .setURL(player.skin + ".png")
            .setLabel("Download")
        ),
      ],
    };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
