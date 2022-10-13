const jaro = require("jaro-winkler");

module.exports = async (Discord, client, msg, args, page) => {
  try {
    if (!page) page = 1;
    let lbStr = args.join(" ").replace(/ +/gm, "_").toLowerCase();
    let lbStr_clean = lbStr[0].toUpperCase();
    for (i = 1; i < lbStr.length; i++) {
      if (lbStr[i] == "_") {
        lbStr_clean = `${lbStr_clean} ${lbStr[i + 1].toUpperCase()}`;
        i++;
      } else lbStr_clean = `${lbStr_clean}${lbStr[i]}`;
    }
    let columns = [
      "bh_wins",
      "bw_beds_broken",
      "bw_doubles_beds_broken",
      "bw_doubles_final_kills",
      "bw_doubles_kills",
      "bw_doubles_wins",
      "bw_final_kills",
      "bw_kills",
      "bw_solo_beds_broken",
      "bw_solo_final_kills",
      "bw_solo_kills",
      "bw_solo_wins",
      "bw_squads_beds_broken",
      "bw_squads_final_kills",
      "bw_squads_kills",
      "bw_squads_wins",
      "bw_trios_beds_broken",
      "bw_trios_final_kills",
      "bw_trios_kills",
      "bw_trios_wins",
      "bw_wins",
      "cq_flags_captured",
      "cq_kills",
      "cq_wins",
      "duels_kills",
      "duels_wins",
      "mm_bow_kills",
      "mm_classic_kills",
      "mm_classic_wins",
      "mm_infection_kills",
      "mm_infection_wins",
      "mm_kills",
      "mm_knife_kills",
      "mm_throw_knife_kills",
      "mm_wins",
      "ms_wins",
      "sc_wins",
      "sg_kills",
      "sg_wins",
      "sw_doubles_insane_kills",
      "sw_doubles_kills",
      "sw_doubles_normal_kills",
      "sw_doubles_wins",
      "sw_kills",
      "sw_solo_insane_kills",
      "sw_solo_kills",
      "sw_solo_normal_kills",
      "sw_solo_wins",
      "sw_wins",
      "tb_kills",
      "tb_wins",
    ];
    if (!columns.includes(lbStr)) {
      let nearest = [];

      columns.forEach((s) => {
        nearest.push({
          name: s,
          value: jaro(s, lbStr, { caseSensitive: false }),
        });
      });

      nearest.sort((a, b) => {
        const bandA = a.value;
        const bandB = b.value;

        let comparison = 0;
        if (bandA > bandB) comparison = 1;
        else if (bandA < bandB) comparison = -1;
        return comparison * -1;
      });

      return `<:helpo:1001073741897408563> Leaderboard not found: ${lbStr_clean}\nDid you mean: ${nearest[0].name
        .split("_")
        .map((v) => (v[0] ? require("../../functions/upper")(v) : ""))
        .join(" ")
        .replace(/ +/gm, " ")}`;
    }

    let leaderboard = await require("../../functions/ng/lb")(
      500,
      "game",
      lbStr
    );
    if (leaderboard.code != 0) return player.msg;

    leaderboard = leaderboard.json;

    if (leaderboard.message)
      return `<:erroro:1001073206389649408> An Error Occured, try again later\n${leaderboard.message}`;

    let comps = [];

    comps.push(
      new Discord.MessageActionRow().addComponents(
        new Discord.MessageSelectMenu()
          .setCustomId(
            JSON.stringify({
              cmd: "lb",
              do: "viewStats",
              data: "unknown",
            })
          )
          .setPlaceholder("View stats for...")
          .addOptions([{ label: "Unknown", value: "unknown" }])
      )
    );

    comps[1] = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setCustomId(
          JSON.stringify({
            cmd: "lbg",
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

    // comps[1] = new Discord.MessageActionRow().addComponents([
    //   new Discord.MessageButton()
    //     .setStyle("PRIMARY")
    //     .setEmoji(`<:arrow_left_2:876016893343973386>`)
    //     .setCustomId(
    //       JSON.stringify({
    //         cmd: "lbg",
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
    //         cmd: "lbg",
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
    //         cmd: "lbg",
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
    //         cmd: "lbg",
    //         do: "changePage",
    //         data: "right2",
    //       })
    //     )
    //     .setDisabled(),
    // ]);

    let queryType = "player";

    let arr_lb = [];
    let selectMenuOpts = [];
    let lb_count = 0;

    for (let i of leaderboard) {
      let arr = Object.values(i);
      selectMenuOpts.push({ label: arr[0], value: arr[0] });
      arr_lb.push(
        `${client.leaderboardRankTxt[lb_count]} [${arr[0]
        }](https://ngmc.co/p/${arr[0].replace(
          / +/g,
          "%20"
        )}) - **${parseInt(arr[1]).toLocaleString()}**`
      );
      lb_count++;
    }

    arr_lb = arr_lb.slice(25 * page - 25, 25 * page);
    selectMenuOpts = selectMenuOpts.slice(25 * page - 25, 25 * page);

    try {
      comps[1].components[0].disabled = false;
      comps[0].components[0].customId = JSON.stringify({
        cmd: "lb",
        do: "viewStats",
        data: queryType || "unknown",
      });
      comps[0].components[0].options = selectMenuOpts;
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
      .setTitle(`<:leaderboardo:1001059628567769228> ${lbStr_clean} Leaderboard`)
      .setTimestamp()
      .setDescription(arr_lb.join("\n"))
      .setFooter(`Page ${page.toString()}/20`);

    return { content: "Leaderboard found", embeds: [embed], components: comps };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
