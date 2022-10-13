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

    let player = await require("../../functions/ng/player leaderboard")(require("../../functions/deQ")(args.join(" ")), { expand: false, withFactionData: false, withGuildData: false, withPunishments: false, withSkinData: false });
    if (player.code != 0) {
      if (player.code == 404) {
        let s = await require("../../functions/genButtons")(
          5,
          require("../../functions/deQ")(args.join(" ")),
          "player",
          "pgl"
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

    player = player.json;

    if (player.message)
      return `<:erroro:1001073206389649408> An Error Occured, try again later\n${player.message}`;

    let types = {};
    let legend = {
      ac: "Arcade",
      bb: "Build Battle",
      beta: "Beta",
      bh: "Block Hunt",
      br: "Battle Royale",
      bw: "Bedwars",
      cq: "Conquest",
      creative: "Creative",
      ctf: "Capture the Flag",
      duels: "Duels",
      factions: "Factions",
      lobby: "Lobby",
      mm: "Murder Mystery",
      ms: "Momma Says",
      rc: "Races",
      replay: "Replay",
      sb: "Skyblock",
      sc: "Soccer",
      sg: "Survival Games",
      sp: "Spleef",
      sw: "SkyWars",
      tb: "The Bridge",
      tr: "TNT Run",
      uhc: "UHC",
      weekly: "Weekly",
      kills: "Kills",
      wins: "Wins",
      deaths: "Deaths",
    };

    let str = ``;
    let filterSpot;
    let filterGame;
    if (args[args.length - 1].startsWith("?") && args.length > 1) {
      filterSpot = parseInt(args[args.length - 1].slice(1));
      filterGame = args[args.length - 1]
        .replace(filterSpot, "")
        .replace("?", "");
    }
    if (!filterGame) filterGame = "all";
    // console.log(filterSpot, filterGame)
    Object.keys(player.data).forEach((v) => (types[v] = null));
    for (let i in types) {
      let words = i.split(/(?=[A-Z])/);
      if (player.data[i] >= filterSpot) null;
      else if (filterGame != "all" && words[0] != filterGame) null;
      else
        types[i] = `${legend[words[0]] || words[0]}${words.length > 1 ? ` ${words.slice(1).join(" ")}` : ""
          }`;
    }

    let lbEmbed = new Discord.MessageEmbed()
      .setAuthor(
        player.player,
        `https://apiv2.nethergames.org/v1/players/${encodeURIComponent(
          player.player
        )}/avatar`,
        `https://ngmc.co/p/${encodeURIComponent(player.player)}`
      )
      .setColor(client.color)
      .setTitle(
        `Game Leaderboard Ranks${filterSpot ? ` (Top ${filterSpot})` : ""}`
      )
      .setURL(
        `https://ngmc.co/p/${encodeURIComponent(
          player.player
        )}#o=true`
      )
      .setFooter("ALL | Last updated")
      .setTimestamp(player.timestamp * 1000);

    for (let i in types) {
      let words = i.split(/(?=[A-Z])/);
      if (player.data[i] >= filterSpot) null;
      else if (filterGame != "all" && words[0] != filterGame) null;
      else str += `\`#${player.data[i]}\` **${types[i]}**\n`;
    }

    let comps = [
      new Discord.MessageActionRow().addComponents(
        new Discord.MessageSelectMenu()
          .setCustomId(
            JSON.stringify({
              cmd: "player",
              do: "filterLbGameStats",
              data: player.player,
            })
          )
          .setPlaceholder("Filter Stats")
          .addOptions([
            { label: "All", value: "all" },
            { label: "Build Battle", value: "bb" },
            { label: "Block Hunt", value: "bh" },
            { label: "Battle Royale", value: "br" },
            { label: "Bedwars", value: "bw" },
            { label: "Capture the Flag", value: "ctf" },
            { label: "Conquests", value: "cq" },
            { label: "Duels", value: "duels" },
            { label: "Murder Mystery", value: "mm" },
            { label: "Momma Says", value: "ms" },
            { label: "Races", value: "rc" },
            { label: "Soccer", value: "sc" },
            { label: "Survival Games", value: "sg" },
            { label: "SkyWars", value: "sw" },
            { label: "The Bridge", value: "tb" },
            { label: "Weekly", value: "weekly" },
          ])
      ),
    ];

    lbEmbed.setDescription(str);

    return { embeds: [lbEmbed], components: comps };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
