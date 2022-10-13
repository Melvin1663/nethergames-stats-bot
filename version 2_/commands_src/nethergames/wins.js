const linkSchema = require("../../schemas/link");
const pb = require("../../functions/progressBar");

module.exports = async (Discord, client, msg, args) => {
  try {
    if (!args.length || args[0].startsWith("?")) {
      const links = await linkSchema.findOne({ userID: msg.member.user.id });
      if (!links) return "<:warningo:1001073452385583215> No player specified";
      if (!links.data.player) return "<:warningo:1001073452385583215> No player specified";
      args.unshift(links.data.player);
    }

    let player = await require("../../functions/ng/player")(
      require("../../functions/deQ")(args.join(" ")),{ expand: false, withFactionData: false, withGuildData: false, withOnline: true, withPunishments: false, withSkinData: false, withStats: true, withVoteStatus: false });
    if (player.code != 0) {
      if (player.code == 404) {
        let s = await require("../../functions/genButtons")(
          5,
          require("../../functions/deQ")(args.join(" ")),
          "player",
          "wins"
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

    let meta = {
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
      Weekly: "Weekly",
    };
    let extraData = Object.keys(player.extra);
    let winsData = [];

    for (let win in player.winsData) {
      if (meta[win] && player.winsData[win] !== 0)
        winsData.push({
          code: win.toLowerCase(),
          game: meta[win],
          value: player.winsData[win],
        });
    }

    winsData.sort((a, b) => {
      const bandA = a.value;
      const bandB = b.value;

      let comparison = 0;
      if (bandA > bandB) comparison = 1;
      else if (bandA < bandB) comparison = -1;
      return comparison * -1;
    });

    let c_subWins = [];
    let subWins = [];

    winsData.forEach((v) => c_subWins.push(v.code));

    c_subWins.forEach((v) => {
      let filtered = extraData.filter(
        (d) => d.startsWith(v.toLowerCase()) && d.includes("Wins")
      );
      let entries = [];
      filtered.forEach((e) => {
        if (e.slice(v.length) === "Wins") return;
        else
          entries.push({
            code: v.toLowerCase(),
            value: e.slice(v.length).replace("Wins", ""),
          });
      });
      entries.forEach((e) => {
        if (player.extra[`${e.code}${e.value}Wins`] > 0) subWins.push(e);
      });
    });

    let n_str = ``;

    for (let i in player.winsData) {
      if (player.winsData[i] > 0)
        n_str += `**[${
          meta[i]
        }](https://portal.nethergames.org/leaderboard/wins/${i.toLowerCase()})**: ${player.winsData[
          i
        ].toLocaleString()}\n`;
      if (subWins.filter((e) => e.code == i.toLowerCase()).length)
        n_str += `${subWins
          .filter((e) => e.code == i.toLowerCase())
          .map(
            (v) =>
              `<:reply:896727153780068352> **${v.value}:** ${player.extra[
                `${v.code}${v.value}Wins`
              ].toLocaleString()}`
          )
          .join("\n")}\n`;
    }

    let g_str = ``;
    let tot = 15;

    winsData.forEach((v, i) => {
      g_str += `**${v.game}:** ${v.value.toLocaleString()}\n${pb(
        "<:pe1:988780719625076756>",
        "<:pe2:988780721646731304>",
        "<:pe3:988780723248988201>",
        "<:bf1:988780688515940352>",
        "<:bf2:988780690294321184>",
        "<:bf3:988780692429234197>",
        (v.value / winsData[0].value) * tot,
        tot
      )}\n`;
    });

    // let winsEmbed_graph = new Discord.MessageEmbed()
    //     .setAuthor("Graphs", client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
    //     .setColor(client.color)
    //     .setTitle(player.name)
    //     .setURL(`https://ngmc.co/p/${encodeURIComponent(player.name)}`)
    //     .setThumbnail(`https://api.ngmc.co/v1/players/${encodeURIComponent(player.name)}/avatar`)
    //     .setDescription(g_str)
    //     .setFooter(`${player.online == true ? 'Online' : 'Offline'} - ${player.online == true ? 'Playing on' : 'Last Seen on'} ${player.lastServerParsed.pretty} ${player.lastServer.match(/\d+/g)[0]}`, player.online == true ? client.onlineIco : client.offlineIco)

    let winsEmbed_number = new Discord.MessageEmbed()
      .setAuthor(
        player.name,
        player.avatar,
        `https://ngmc.co/p/${encodeURIComponent(player.name)}`
      )
      .setColor(client.color)
      .setTitle(`Wins: ${player.wins.toLocaleString()}`)
      .setURL(
        `https://ngmc.co/p/${encodeURIComponent(player.name)}`
      )
      .setDescription(n_str)
      .setFooter(
        `${player.online == true ? "Online" : "Offline"} - ${
          player.online == true ? "Playing on" : "Last Seen on"
        } ${player.lastServerParsed.pretty}`,
        player.online == true ? client.onlineIco : client.offlineIco
      );

    return { embeds: [winsEmbed_number] };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
