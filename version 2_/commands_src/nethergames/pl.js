const get = require("node-fetch2");
const linkSchema = require("../../schemas/link");

module.exports = async (Discord, client, msg, args) => {
  try {
    if (!args.length || args[0].startsWith("?")) {
      const links = await linkSchema.findOne({ userID: msg.member.user.id });
      if (!links) return "<:warningo:1001073452385583215> No player specified";
      if (!links.data.player) return "<:warningo:1001073452385583215> No player specified";
      args.unshift(links.data.player);
    }

    let player = await require("../../functions/ng/player")(require("../../functions/deQ")(args.join(" ")), { expand: false, withFactionData: false, withGuildData: false, withPunishments: false, withSkinData: false });
    if (player.code != 0) {
      if (player.code == 404) {
        let s = await require("../../functions/genButtons")(
          5,
          require("../../functions/deQ")(args.join(" ")),
          "player",
          "pl"
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

    let types = ["credits", "kdr", "wlr", "kills", "parkour", "voters", "wins", "xp"];

    let data = {
      credits: null,
      kdr: null,
      wlr: null,
      kills: null,
      parkour: null,
      voters: null,
      wins: null,
      xp: null,
    };

    types.forEach((i) => {
      let lb = client.leaderboards[i];
      if (!lb || !lb?.length) {
      } else {
        let keys = Object.keys(lb[0]);
        let property = keys[0];
        let value = keys[1];
        if (!property) console.log(`${i} Leaderboard: Unknown property`);
        let filtered = client.leaderboards[i].filter(
          (v) => v[property] == player.name
        );
        if (filtered.length > 0) {
          let index = lb.indexOf(filtered[0]);
          data[i] = `${client.leaderboardRankTxt[index]} [${filtered[0][
            value
          ].toLocaleString()}](https://forums.nethergames.org)`;
        }
      }
    });

    let lbEmbed = new Discord.MessageEmbed()
      .setAuthor(player.name, `https://apiv2.nethergames.org/v1/players/${encodeURIComponent(player.name)}/avatar`, `https://ngmc.co/p/${encodeURIComponent(player.name)}`)
      .setColor(client.color)
      .setTitle(`Global Leaderboard Ranks`)
      .setURL(`https://ngmc.co/p/${encodeURIComponent(player.name)}#o=true`)
      .setFooter("Last updated")
      .setTimestamp(client.leaderboards.timestamp);

    types.forEach((i) => {
      if (data[i] != null)
        lbEmbed.addField(
          `${require("../../functions/upper")(i)}`,
          data[i],
          true
        );
    });

    if (!lbEmbed.fields.length)
      lbEmbed.setDescription("<:erroro:1001073206389649408> Player isn't in any global leaderboard");

    return {
      embeds: [lbEmbed],
      components: [
        new Discord.MessageActionRow().addComponents(
          new Discord.MessageButton()
            .setCustomId(
              JSON.stringify({
                cmd: "pl",
                do: "showLbGame",
                data: player.name,
              })
            )
            .setStyle("PRIMARY")
            .setLabel("View more")
        ),
      ],
    };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
