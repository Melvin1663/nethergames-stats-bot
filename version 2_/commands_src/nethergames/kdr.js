const linkSchema = require("../../schemas/link");

module.exports = async (Discord, client, msg, args) => {
  try {
    if (!args.length || args[0].startsWith("?")) {
      const links = await linkSchema.findOne({ userID: msg.member.user.id });
      if (!links) return "<:warningo:1001073452385583215> No player specified";
      if (!links.data.player) return "<:warningo:1001073452385583215> No player specified";
      args.unshift(links.data.player);
    }

    let player = await require("../../functions/ng/player")(require("../../functions/deQ")(args.join(" ")),{ expand: false, withFactionData: false, withGuildData: false, withPunishments: false, withSkinData: false, withStats: true, withVoteStatus: false });
    if (player.code != 0) {
      if (player.code == 404) {
        let s = await require("../../functions/genButtons")(
          5,
          require("../../functions/deQ")(args.join(" ")),
          "player",
          "kdr"
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

    const metaData = {
      AC: "Arcade",
      BB: "Build Battle",
      Beta: "Beta",
      BH: "Block Hunt",
      BR: "Battle Royale",
      BW: "Bedwars",
      CQ: "Conquests",
      Creative: "Creative",
      CTF: "Capture the Flag",
      Duels: "Duels",
      Factions: "Factions",
      Lobby: "Lobby",
      MM: "Murder Mystery",
      MS: "Momma Says",
      RC: "Races",
      Replay: "Replay",
      SB: "Skyblock",
      SC: "Soccer",
      SG: "Survival Games",
      SP: "Spleef",
      SW: "SkyWars",
      TB: "The Bridge",
      TR: "TNT Run",
      UHC: "UHC",
    };
    const meta = [];
    const metaData_lowerCase = {};
    Object.keys(metaData).forEach((i) => meta.push(i.toLowerCase()));
    for (let i in metaData) {
      metaData_lowerCase[i.toLowerCase()] = metaData[i];
    }

    let res = require("../../functions/getKDR")(player);

    if (res.txt) return res.txt;

    let embed = new Discord.MessageEmbed()
      .setAuthor(
        player.name,
        player.avatar,
        `https://ngmc.co/p/${encodeURIComponent(player.name)}`
      )
      .setColor(client.color)
      .setTitle(
        `K/DR: ${(!player.deaths
          ? 0
          : player.kills / player.deaths
        )?.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
      )
      .setURL(
        `https://ngmc.co/p/${encodeURIComponent(player.name)}`
      )
      .setFooter(
        `${player.online == true ? "Online" : "Offline"} - ${
          player.online == true ? "Playing on" : "Last Seen on"
        } ${player.lastServerParsed.pretty}`,
        player.online == true ? client.onlineIco : client.offlineIco
      )
      .setDescription(res.string || "No Data");

    return { embeds: [embed] };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
