const linkSchema = require("../../schemas/link");
const ngdata = require("../../schemas/ngblade");

module.exports = async (Discord, client, msg, args) => {
  try {

    return '<:warningo:1001073452385583215> Progress command is temporarily disabled'

    if (!args.length || args[0].startsWith("?")) {
      const links = await linkSchema.findOne({ userID: msg.member.user.id });
      if (!links) return "<:warningo:1001073452385583215> No player specified";
      if (!links.data.player) return "<:warningo:1001073452385583215> No player specified";
      args.unshift(links.data.player);
    }

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
          "progress"
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

    let days = 7;

    if (args[args.length - 1].startsWith("?") && args.length > 1)
      days = parseInt(args[args.length - 1].replace("?", ""));
    if (!days) days = 7;

    let data = await ngdata.findOne({ id: player.xuid });
    if (!data) return `<:erroro:1001073206389649408> **${player.name}** was not found in the Database`;

    if (data.data.length < days)
      return `<:erroro:1001073206389649408> (${days} > ${
        data.data.length
      }) Cannot go back more than ${data.data.length.toLocaleString()} days.`;

    let up = "<:up:895216801825300490>";
    let na = "<:even:895216801758208050>";
    let no = "<:down:895216801657540608>";
    let yn = "<:green_down:985079914267050044>";

    let from = data.data[data.data.length - days];

    if (!from) return `<:erroro:1001073206389649408> (${days}/${data.data.length}) Data not found`;
    let res = [];
    let stats = {
      credits: "Credits",
      xp: "XP",
      kills: "Kills",
      deaths: "Deaths",
      wins: "Wins",
      losses: "Losses",
      level: "Level",
      kdr: "K/DR",
      wlr: "W/LR",
      wdr: "W/DR",
    };

    Object.keys(stats).forEach((k) => {
      let current = 0;
      switch (k) {
        case "kdr":
          current = (player.kills / player.deaths).toFixed(2) || 0;
          break;
        case "wlr":
          current = (player.wins / player.losses).toFixed(2) || 0;
          break;
        case "wdr":
          current = (player.wins / player.deaths).toFixed(2) || 0;
          break;
        case "level":
          current = require("../../functions/xpToLvl")(player.xp).toFixed(2);
          break;
        default:
          current = player[k];
      }
      let val = 0;
      switch (k) {
        case "wlr":
          val = current - (from.wins / from.losses).toFixed(2) || 0;
          break;
        case "wdr":
          val = current - (from.wins / from.deaths).toFixed(2) || 0;
          break;
        case "kdr":
          val = current - (from.kills / from.deaths).toFixed(2) || 0;
          break;
        case "level":
          val =
            current - require("../../functions/xpToLvl")(from.xp).toFixed(2);
          break;
        default:
          val = current - from[k];
      }
      res.push(
        `[${stats[k]}:](https://ngmc.co) ${current.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })} (${
          ["deaths", "losses"].includes(k)
            ? val > 0
              ? "🔺"
              : val == 0
              ? na
              : yn
            : val > 0
            ? up
            : val == 0
            ? na
            : no
        } ${val.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })})`
      );
    });

    let embed = new Discord.MessageEmbed()
      .setAuthor(
        player.name,
        player.avatar,
        `https://ngmc.co/p/${encodeURIComponent(player.name)}`
      )
      .setDescription(res.join("\n"))
      .setTimestamp(
        player.online == true ? Date.now() : new Date(player.lastJoin).getTime()
      )
      .setFooter(
        `${player.online == true ? "Online" : "Offline"} - ${
          player.online == true ? "Playing on" : "Last Seen on"
        } ${player.lastServerParsed.pretty}`,
        player.online == true ? client.onlineIco : client.offlineIco
      )
      .setTitle(
        `Stats for the Last ${days.toLocaleString()} days (${new Date(
          from.time
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })})`
      )
      .setColor(client.color);

    return { embeds: [embed] };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
