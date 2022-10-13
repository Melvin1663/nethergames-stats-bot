module.exports = async (Discord, client, msg, args, page) => {
  try {
    if (!page) page = 1;

    let lb = [
      "credits",
      "factions",
      "factionsbeststreak",
      "factionskills",
      "factionsstreak",
      "guilds",
      "guildslvl",
      "kdr",
      "wlr",
      "kills",
      "parkour",
      "voters",
      "wins",
      "xp",
      "lvl",
    ];

    let lbM = {
      credits: "Credits",
      factions: "Factions Strength",
      factionsbeststreak: "Factions Best Streak",
      factionskills: "Factions Kills",
      factionsstreak: "Factions Streak",
      guilds: "Guild XP",
      guildslvl: "Guild Level",
      kdr: "K/DR",
      wlr: "W/LR",
      kills: "Kills",
      parkour: "Parkour",
      voters: "Voters",
      wins: "Wins",
      xp: "Exp",
      lvl: "Levels",
    };

    let comps = [];
    comps.push(
      new Discord.MessageActionRow().addComponents(
        new Discord.MessageSelectMenu()
          .setCustomId(
            JSON.stringify({
              cmd: "lb",
              do: "selectGbLb",
            })
          )
          .setPlaceholder("Pick a Leaderboard!")
          .addOptions([
            { label: "Credits", value: "credits" },
            { label: "Factions Strength", value: "factions" },
            { label: "Factions Best Streak", value: "factionsbeststreak" },
            { label: "Factions Kills", value: "factionskills" },
            { label: "Factions Streak", value: "factionsstreak" },
            { label: "Guild XP", value: "guilds" },
            { label: "Guild Level", value: "guildslvl" },
            { label: "K/DR", value: "kdr" },
            { label: "W/LR", value: "wlr" },
            { label: "Kills", value: "kills" },
            { label: "Parkour", value: "parkour" },
            { label: "Voters", value: "voters" },
            { label: "Wins", value: "wins" },
            { label: "Exp", value: "xp" },
            { label: "Levels", value: "lvl" },
          ])
      )
    );

    comps[1] = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setCustomId(
          JSON.stringify({
            cmd: "lb",
            do: "viewStats",
            data: "unknown",
          })
        )
        .setPlaceholder("View stats for...")
        .setDisabled()
        .addOptions([{ label: "Unknown", value: "unknown" }])
    );

    comps[2] = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setCustomId(
          JSON.stringify({
            cmd: "lb",
            do: "changePage",
          })
        )
        .setPlaceholder('Change Page')
        .setDisabled()
        .addOptions([
          { label: 'Page 1 (1-25)', value: '1' },
          { label: 'Page 2 (26-50)', value: '2' },
          { label: 'Page 3 (51-75)', value: '3' },
          { label: 'Page 4 (76-100)', value: '4' },
          { label: 'Page 5 (101-125)', value: '5' },
          { label: 'Page 6 (126-150)', value: '6' },
          { label: 'Page 7 (151-175)', value: '7' },
          { label: 'Page 8 (176-200)', value: '8' },
          { label: 'Page 9 (201-225)', value: '9' },
          { label: 'Page 10 (226-250)', value: '10' },
          { label: 'Page 11 (251-275)', value: '11' },
          { label: 'Page 12 (276-300)', value: '12' },
          { label: 'Page 13 (301-325)', value: '13' },
          { label: 'Page 14 (326-350)', value: '14' },
          { label: 'Page 15 (351-375)', value: '15' },
          { label: 'Page 16 (376-400)', value: '16' },
          { label: 'Page 17 (401-425)', value: '17' },
          { label: 'Page 18 (426-450)', value: '18' },
          { label: 'Page 19 (451-475)', value: '19' },
          { label: 'Page 20 (476-500)', value: '20' }
        ])
    )

    // comps[2] = new Discord.MessageActionRow().addComponents([
    //   new Discord.MessageButton()
    //     .setStyle("PRIMARY")
    //     .setEmoji(`<:arrow_left_2:876016893343973386>`)
    //     .setCustomId(
    //       JSON.stringify({
    //         cmd: "lb",
    //         do: "changePage",
    //         data: "left2",
    //       })
    //     )
    //     .setDisabled(),
    //   new Discord.MessageButton()
    //     .setStyle("PRIMARY")
    //     .setEmoji("<:arrow_left:876016893226545153>")
    //     .setCustomId(
    //       JSON.stringify({
    //         cmd: "lb",
    //         do: "changePage",
    //         data: "left",
    //       })
    //     )
    //     .setDisabled(),
    //   new Discord.MessageButton()
    //     .setStyle("PRIMARY")
    //     .setEmoji("<:arrow_right:876016892962295840>")
    //     .setCustomId(
    //       JSON.stringify({
    //         cmd: "lb",
    //         do: "changePage",
    //         data: "right",
    //       })
    //     )
    //     .setDisabled(),
    //   new Discord.MessageButton()
    //     .setStyle("PRIMARY")
    //     .setEmoji("<:arrow_right_2:876016893402705941>")
    //     .setCustomId(
    //       JSON.stringify({
    //         cmd: "lb",
    //         do: "changePage",
    //         data: "right2",
    //       })
    //     )
    //     .setDisabled(),
    // ]);

    if (!lb.includes(args.join("").toLowerCase()))
      return {
        content: args.length
          ? `<:erroro:1001073206389649408> Global LB not found: \`${args.join(
            ""
          )}\`. Try picking one from the select menu`
          : `Pick a Global LB from the select menu`,
        components: comps,
      };

    let sLb = lb[lb.indexOf(args.join("").toLowerCase())];

    comps[0].components[0].options.find(
      (v) => v.label == lbM[sLb]
    ).default = true;

    let leaderboard = await require("../../functions/ng/lb")(
      500,
      ["factionsbeststreak", "factionskills", "factionsstreak"].includes(sLb)
        ? "factions"
        : sLb == "lvl"
          ? "xp"
          : sLb.replace("guildslvl", "guilds"),
      undefined,
      sLb.replace("factions", "")
    );
    if (leaderboard.code != 0) return leaderboard.msg;

    leaderboard = leaderboard.json;

    if (leaderboard.message)
      return `<:erroro:1001073206389649408> An Error Occured, try again later\n${leaderboard.message}`;

    let queryType = "player";

    if (sLb.includes("factions")) queryType = "faction";
    else if (sLb.includes("guild")) queryType = "guild";

    let arr_lb = [];
    let selectMenuOpts = [];
    let lb_count = 0;

    for (let i of leaderboard) {
      let arr = Object.values(i);
      selectMenuOpts.push({ label: arr[0], value: arr[0] });
      arr_lb.push(`${client.leaderboardRankTxt[lb_count]} [${arr[0]}](https://portal.nethergames.org/${queryType}/${arr[0].replace(/ +/g, "%20")}) - **${sLb == "factionsbeststreak"
        ? parseInt(i.bestStreak).toLocaleString() : sLb == "factionsstreak"
          ? parseInt(i.streak).toLocaleString() : sLb == "factionskills"
            ? parseInt(i.kills).toLocaleString() : sLb == "lvl"
              ? require("../../functions/xpToLvl")(+arr[1]).toLocaleString() : sLb.includes("faction") || (sLb.includes("guilds") && !sLb.includes("lvl"))
                ? parseInt(arr[2]).toLocaleString() : sLb == "guildslvl"
                  ? parseInt(i.level).toLocaleString() : sLb == "parkour"
                    ? require("../../functions/shortTime")(i.time) : sLb == "kdr"
                      ? parseFloat(arr[1]).toLocaleString() : sLb == "wlr"
                        ? parseFloat(arr[1]).toLocaleString() : parseInt(arr[1]).toLocaleString()
        }**${sLb == "parkour"
          ? `${parseFloat(arr[1].toFixed(3)).toString().split(".")[1]}ms`
          : ""
        }`
      );
      lb_count++;
    }

    arr_lb = arr_lb.slice(25 * page - 25, 25 * page);
    selectMenuOpts = selectMenuOpts.slice(25 * page - 25, 25 * page);

    try {
      comps[2].components[0].disabled = false;
      comps[1].components[0].disabled = false;
      comps[1].components[0].customId = JSON.stringify({
        cmd: "lb",
        do: "viewStats",
        data: queryType || "unknown",
      });
      comps[1].components[0].options = selectMenuOpts;
    } catch (err) {
      console.log(err);
      return `<:erroro:1001073206389649408> An Error Occured`;
    }

    let embed = new Discord.MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setColor(client.color)
      .setTitle(`<:leaderboardo:1001059628567769228> ${lbM[sLb]} Leaderboard`)
      .setTimestamp()
      .setDescription(arr_lb.join("\n"))
      .setFooter(`Page ${page.toString()}/20`);

    return { content: "Leaderboard found", embeds: [embed], components: comps };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
