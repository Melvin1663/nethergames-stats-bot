const getPrevMondays = require("../../functions/getPrevMondays");
const getDay1 = require("../../functions/getDay1");
const linkSchema = require("../../schemas/link");
const ngblade = require("../../schemas/ngblade");

module.exports = async (Discord, client, msg, args) => {

  return '<:warningo:1001073452385583215> WinsSince command is temporarily disabled'

  try {
    if (!args.length || args[0].startsWith("?")) {
      const links = await linkSchema.findOne({ userID: msg.member.user.id });
      if (!links) return "<:warningo:1001073452385583215> No player specified";
      if (!links.data.player) return "<:warningo:1001073452385583215> No player specified";
      args.unshift(links.data.player);
    }

    let times = ["yesterday", "lastweek", "lastmonth"];

    let query = args[args.length - 1].startsWith("?")
      ? args[args.length - 1].replace("?", "").toLowerCase()
      : "";

    if (!query) {
      args.push("?yesterday");
      query = args[args.length - 1].startsWith("?")
        ? args[args.length - 1].replace("?", "").toLowerCase()
        : "";
    }
    if (!times.includes(query))
      return `Theres no type \`${query || " "}\`\n- \`${times.join(
        "`\n- `"
      )}\``;

    let player = await require("../../functions/ng/player")(
      require("../../functions/deQ")(args.join(" ")),
      true,
      false,
      false,
      false,
      false
    );
    if (player.code != 0) {
      if (player.code == 404) {
        let s = await require("../../functions/genButtons")(
          5,
          require("../../functions/deQ")(args.join(" ")),
          "player",
          "winssince"
        );
        if (s.code == 0) {
          let resp = {
            content: `<:erroro:1001073206389649408> Player not found: ${require("../../functions/deQ")(
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

    const ngdata = await ngblade.findOne({ id: player.xuid });
    let isInNGBlade = false;
    if (ngdata && ngdata.data.length) isInNGBlade = true;

    if (!isInNGBlade)
      return `<:erroro:1001073206389649408> You are currently not being tracked, use \`ns!track\` to track`;

    let embed = new Discord.MessageEmbed()
      .setAuthor(player.name, player.avatar)
      .setColor(client.color)
      .setTitle(`Total Wins: ${player.wins.toLocaleString()}`)
      .setURL(
        `https://ngmc.co/p/${encodeURIComponent(player.name)}`
      )
      .setTimestamp();

    switch (query) {
      case "yesterday":
        {
          if (ngdata.data.length < 2) return `<:erroro:1001073206389649408> Not enough Data to show`;
          let data = ngdata.data[ngdata.data.length - 1];
          embed.setDescription(
            `**${(
              player.wins - data.wins
            ).toLocaleString()} Wins** since <t:${~~(data.time / 1000)}>`
          );
        }
        break;
      case "lastweek":
        {
          if (ngdata.data.length < 7) return `<:erroro:1001073206389649408> Not enough Data to show`;
          let data = ngdata.data.find(
            (a) =>
              a.date ==
              getPrevMondays().toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })
          );
          embed.setDescription(
            `**${(
              player.wins - data.wins
            ).toLocaleString()} Wins** since <t:${~~(data.time / 1000)}>`
          );
        }
        break;
      case "lastmonth": {
        if (ngdata.data.length < 30) return `<:erroro:1001073206389649408> Not enough Data to show`;
        let data = ngdata.data.find(
          (a) =>
            a.date ==
            getDay1().toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })
        );
        embed.setDescription(
          `**${(player.wins - data.wins).toLocaleString()} Wins** since <t:${~~(
            data.time / 1000
          )}>`
        );
      }
    }

    return { embeds: [embed] };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
