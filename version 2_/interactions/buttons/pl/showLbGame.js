const get = require("node-fetch2");

module.exports = async (json, client, Discord, int) => {
  if (!json.data?.length)
    return int.reply({ content: "Player Unspecified", ephemeral: true });

  if (!int.deffered && !int.replied) await int.deferReply().catch(console.log);

  let player = await require("../../../functions/ng/player leaderboard")(
    require("../../../functions/deQ")(json.data)
  );
  if (player.code != 0) return player.msg;

  player = await player.json;

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
  Object.keys(player.data).forEach((v) => (types[v] = null));
  for (let i in types) {
    let words = i.split(/(?=[A-Z])/);
    types[i] = `${legend[words[0]] || words[0]}${
      words.length > 1 ? ` ${words.slice(1).join(" ")}` : ""
    }`;
  }

  let lbEmbed = new Discord.MessageEmbed()
    .setAuthor(
      client.user.username,
      client.user.displayAvatarURL({ dynamic: true, size: 1024 })
    )
    .setColor(client.color)
    .setTitle(player.player)
    .setURL(
      `https://ngmc.co/p/${encodeURIComponent(player.player)}`
    )
    .setThumbnail(
      `https://api.ngmc.co/v1/players/${encodeURIComponent(
        player.player
      )}/avatar`
    )
    .setFooter("ALL | Last updated")
    .setTimestamp(parseInt(String(player.timestamp) + "000"));

  for (let i in types) {
    str += `**${types[i]}:** \`#${player.data[i]}\`\n`;
  }

  let comps = [
    new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setCustomId(
          JSON.stringify({
            cmd: "player",
            do: "filterLbGameStats",
            data: json.data,
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

  int.editReply({ embeds: [lbEmbed], components: comps }).catch(console.log);

  let comp = int.message.components[0].components.filter((v) =>
    v.customId.includes("showLbGame")
  );

  int.message.components[0].components[
    int.message.components[0].components.indexOf(comp[0])
  ].disabled = true;

  int.message.edit({ components: int.message.components }).catch(console.log);
};
