const xpToLvl = require("../../functions/xpToLvl");
const linkSchema = require("../../schemas/link");
const ngblade = require("../../schemas/ngblade");

module.exports = async (Discord, client, msg, args) => {
  try {
    if (!args.length || args[0].startsWith("?")) {
      const links = await linkSchema.findOne({ userID: msg.member.user.id });
      if (!links) return "<:erroro:1001073206389649408> No player specified";
      if (!links.data.player) return "<:erroro:1001073206389649408> No player specified";
      args.unshift(links.data.player);
    }

    let player = await require("../../functions/ng/player")(require("../../functions/deQ")(args.join("%20").replace(/ +/g, "%20")), { expand: false, withFactionData: false, withGuildData: false, withSkinData: false });
    if (player.code != 0) {
      if (player.code == 404) {
        let s = await require("../../functions/genButtons")(
          5,
          require("../../functions/deQ")(
            args.join("%20").replace(/ +/g, "%20")
          ),
          "player",
          "player"
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

    player = player.json;

    if (player.message)
      return `<:erroro:1001073206389649408> An Error Occured, try again later\n${player.message}`;

    const ngdata = await ngblade.findOne({ id: player.xuid });
    let isInNGBlade = false;
    if (ngdata) isInNGBlade = true;

    require('node-fetch2')(`https://api.ngmc.co/v1/players/${player.name}/stats?periodStart=0`, { headers: { "Authorization": client.ngKey } });

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

    let comps = [];

    comps.push(
      new Discord.MessageActionRow().addComponents(
        new Discord.MessageSelectMenu()
          .setCustomId(
            JSON.stringify({
              cmd: "player",
              do: "filterStats",
              data: player.name,
            })
          )
          .setPlaceholder("Filter Stats")
          .addOptions([
            { label: "Overall", value: "?ov" },
            { label: "Block Hunt", value: "?bh" },
            { label: "Bedwars", value: "?bw" },
            { label: "Conquests", value: "?cq" },
            { label: "Duels", value: "?duels" },
            { label: "Murder Mystery", value: "?mm" },
            { label: "Momma Says", value: "?ms" },
            { label: "Soccer", value: "?sc" },
            { label: "Survival Games", value: "?sg" },
            { label: "SkyWars", value: "?sw" },
            { label: "The Bridge", value: "?tb" },
          ])
      )
    );

    comps.push(
      new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId(
            JSON.stringify({
              cmd: "player",
              do: "showAdvanced",
              data: player.name,
            })
          )
          .setLabel("Advanced")
          .setStyle("PRIMARY")
      )
    );

    if (player.wins > 0)
      comps[1].addComponents(
        new Discord.MessageButton()
          .setCustomId(
            JSON.stringify({
              cmd: "player",
              do: "showWinsSum",
              data: player.name,
            })
          )
          .setLabel("Wins")
          .setStyle("PRIMARY")
      );

    comps[1].addComponents(
      new Discord.MessageButton()
        .setCustomId(
          JSON.stringify({
            cmd: "player",
            do: "showKDandWL",
            data: player.name,
          })
        )
        .setLabel("K/D, W/L Ratio")
        .setStyle("PRIMARY")
    );

    if (player.guild)
      comps[1].addComponents(
        new Discord.MessageButton()
          .setCustomId(
            JSON.stringify({
              cmd: "player",
              do: "showGuild",
              data: player.guild,
            })
          )
          .setLabel(`${player.guild} Guild`)
          .setStyle("PRIMARY")
      );

    comps[1].addComponents(
      new Discord.MessageButton()
        .setCustomId(
          JSON.stringify({
            cmd: "player",
            do: "showSkin",
            data: player.name,
          })
        )
        .setLabel("Skin")
        .setStyle("PRIMARY")
        .setDisabled(!player.skinVisibility)
    );

    comps.push(
      new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId(
            JSON.stringify({
              cmd: "player",
              do: "showLb",
              data: player.name,
            })
          )
          .setLabel("Global LB Ranks")
          .setStyle("PRIMARY"),
        new Discord.MessageButton()
          .setCustomId(
            JSON.stringify({
              cmd: "player",
              do: "showLbGame",
              data: player.name,
            })
          )
          .setLabel("Game LB Ranks")
          .setStyle("PRIMARY"),
        new Discord.MessageButton()
          .setCustomId(
            JSON.stringify({
              cmd: "player",
              do: "selectGraph",
              data: ["player", player.name],
            })
          )
          .setLabel("Graphs")
          .setStyle("DANGER")
          .setDisabled(!isInNGBlade),
        new Discord.MessageButton()
          .setCustomId(
            JSON.stringify({
              cmd: "player",
              do: "getProgress",
              data: player.name,
            })
          )
          .setLabel("Progress")
          .setStyle("DANGER")
          .setDisabled(!isInNGBlade && ngdata?.data?.length < 6),
        new Discord.MessageButton()
          .setCustomId(
            JSON.stringify({
              cmd: "player",
              do: "refreshStats",
              data: player.name,
            })
          )
          .setLabel("Refresh")
          .setStyle("SUCCESS")
      )
    );

    if (player.punishmentsNew?.length > 0) {
      if (!comps[3]) comps.push(new Discord.MessageActionRow());
      comps[3].addComponents(
        new Discord.MessageButton()
          .setCustomId(
            JSON.stringify({
              cmd: "player",
              do: "showPunishments",
              data: player.name,
            })
          )
          .setLabel(
            `${player.punishmentsNew.length} Punishment${player.punishmentsNew.length == 1 ? "" : "s"
            }`
          )
          .setStyle("PRIMARY")
      );
    }

    if (
      args[args.length - 1].startsWith("?") &&
      args.length > 1 &&
      args[args.length - 1].slice(1).toLowerCase() != "ov"
    ) {
      let game = args[args.length - 1].slice(1).toLowerCase();
      let info_av_games = [];
      let avGame = [
        "bh",
        "bw",
        "cq",
        "duels",
        "mm",
        "ms",
        "rc",
        "sc",
        "sg",
        "sw",
        "tb",
      ];
      avGame.forEach((i) => {
        if (meta.includes(i))
          info_av_games.push(`\`${i}\` - ${metaData_lowerCase[i]}`);
      });
      if (!avGame.includes(game))
        return `<:erroro:1001073206389649408> No Data for Game Code \`${game.toUpperCase()}\`\n\nPerhaps you did a typo?\n${info_av_games.join(
          "\n"
        )}`;
      let stats = await require(`../../util/game_stats/${game}`)(
        client,
        Discord,
        player,
        client.onlineIco,
        client.offlineIco
      );

      comps[0].components[0].options.find(
        (v) => v.value == `?${game}`
      ).default = true;

      return { embeds: [stats.embed], components: comps };
    }

    let score = 0;
    let eval = "";

    score += player.kills / 1250;
    score += player.wins / 500;
    score += player.level / 25;
    score += player.credits / 750;

    score = Math.round(score);

    if (score == 0) eval = "Horrible";
    else if (score >= 1 && score <= 10) eval = "Bad";
    else if (score >= 11 && score <= 20) eval = "Casuals";
    else if (score >= 21 && score <= 40) eval = "Average";
    else if (score >= 41 && score <= 60) eval = "Good";
    else if (score >= 61 && score <= 80) eval = "Nice";
    else if (score >= 81 && score <= 120) eval = "Very Good";
    else if (score >= 121 && score <= 150) eval = "Legendary";
    else if (score >= 151 && score <= 220) eval = "How?";
    else if (score >= 221) eval = "No Lifer";
    else eval = "No Score";

    let winsData = [];
    let staffRanks = [];
    let flagD = require('../../functions/playerflags');
    let allKills = 0;
    let allDeaths = 0;
    for (key in player.extraNested) {
      if (player.extraNested[key].kills) allKills += player.extraNested[key].kills
    }
    for (key in player.extraNested) {
      if (player.extraNested[key].deaths) allDeaths += player.extraNested[key].deaths
    }
    player.ranks.forEach((e) =>
      [
        "Owner",
        "Director",
        "Advisor",
        "Community",
        "Admin",
        "Dev",
        "Supervisor",
        "Discord",
        "Mod",
        "Crew",
        "Trainee",
        "Builder",
        "Designer",
        "Game Designer",
      ].includes(e)
        ? staffRanks.push(e)
        : null
    );
    for (let i in player.winsData) {
      if (player.winsData[i])
        winsData.push({ game: i, value: player.winsData[i] });
    }
    winsData.sort((a, b) => {
      const bandA = a.value;
      const bandB = b.value;

      let comparison = 0;
      if (bandA > bandB) comparison = 1;
      else if (bandA < bandB) comparison = -1;
      return comparison * -1;
    });

    let mainEmbed = new Discord.MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setColor(client.color)
      .setTitle(player.name)
      .setURL(`https://ngmc.co/p/${encodeURIComponent(player.name)}`)
      .setThumbnail(player.avatar)
      .setTimestamp(player.online == true ? Date.now() : new Date(player.lastJoin).getTime())
      .addFields(
        {
          name: "<:infoo:1001034224381460480> General",
          value:
            `**Level:** ${xpToLvl(player.xp).toLocaleString() ?? 0}\n` +
            `**XP:** ${player.xp.toLocaleString() ?? 0}\n` +
            `**Ranks:** ${player.ranks.length ? player.ranks.join(", ") : "**__No Ranks__**"
            }\n` +
            `**Tier:** ${player.tier ?? "**__No Tier__**"}\n` +
            `**Guild:** ${player.guild
              ? `[${player.guild
              }](https://ngmc.co/g/${encodeURIComponent(
                player.guild
              )})`
              : "**__No Guild__**"
            }\n` +
            `**Credits:** ${player.statusCredits?.toLocaleString()}\n` +
            `**Kills:** ${player.kills?.toLocaleString()}\n` +
            `**All Kills:** ${allKills?.toLocaleString()}\n` +
            `**Deaths:** ${player.deaths?.toLocaleString()}\n` +
            `**All Deaths:** ${allDeaths?.toLocaleString()}\n` +
            `**Wins:** ${player.wins?.toLocaleString()}\n` +
            `**Losses:** ${player.losses?.toLocaleString()}\n`,
          inline: true,
        },
        {
          name: "<:infoo:1001034224381460480> More Info",
          value:
            `**K/DR:** (${(!player.deaths
              ? 0
              : player.kills / player.deaths
            )?.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}) ${(!player.deaths
              ? 0
              : player.kills / player.deaths
            ).toLocaleString("en-US", {
              minimumFractionDigits: 5,
              maximumFractionDigits: 5,
            })}\n` +
            `**AK/ADR:** (${!allDeaths
              ? 0
              : (allKills / allDeaths)?.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
            }) ${(!allDeaths
              ? 0
              : allKills / allDeaths
            ).toLocaleString("en-US", {
              minimumFractionDigits: 5,
              maximumFractionDigits: 5,
            })}\n` +
            `**W/LR:** (${!player.losses
              ? 0
              : (player.wins / player.losses)?.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
            }) ${(!player.losses
              ? 0
              : player.wins / player.losses
            ).toLocaleString("en-US", {
              minimumFractionDigits: 5,
              maximumFractionDigits: 5,
            })}\n` +
            `**W/DR:** (${(!player.deaths
              ? 0
              : player.wins / player.deaths
            )?.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}) ${(!player.deaths
              ? 0
              : player.wins / player.deaths
            ).toLocaleString("en-US", {
              minimumFractionDigits: 5,
              maximumFractionDigits: 5,
            })}\n` +
            `**Kill Rate:** ${Math.round(
              (player.kills / (player.kills + player.deaths)) * 100
            )}%\n` +
            `**Death Rate:** ${Math.round(
              (player.deaths / (player.kills + player.deaths)) * 100
            )}%\n` +
            `**Win Rate:** ${Math.round(
              (player.wins / (player.wins + player.losses)) * 100
            )}%\n` +
            `**Lose Rate:** ${Math.round(
              (player.losses / (player.wins + player.losses)) * 100
            )}%\n` +
            `**Vote Status:** ${player.voteStatus == 0
              ? "Not Voted"
              : player.voteStatus == 1
                ? "Unclaimed Vote"
                : player.voteStatus == 2
                  ? "Claimed Vote"
                  : "**__N/A__**"
            }\n` +
            `**Mains:** ${metaData[winsData[0]?.game] ?? "N/A"}\n` +
            `**Active:** ${new Date(player.lastJoined).getTime() * 1000 < Date.now() - 1296000000 ? "No" : "Yes"}\n` +
            `${player.titan == true ? `**Titan Expires:** <t:${~~(new Date(player.titanUntil).getTime() / 1000)}:D>` : ''}`,
          inline: true,
        },
        {
          name: "<:hashtago:1001039371740381184> Estimated Player Score",
          value: `(${Math.round(score)}) ${eval}`,
        },
        {
          name: `<:cticko:1001039369668399154> Statuses`,
          value:
            `${typeof player.banned != "boolean"
              ? "<:invisible:816205800031780894>"
              : player.banned == true
                ? "<:online:816205802905665547>"
                : "<:dnd:816205800350416967>"
            } Banned${player.banned
              ? " (" +
              player.punishmentsNew.find((o) => o.type == 'BAN')?.reason +
              ")"
              : ""
            }` +
            `\n${typeof player.muted != "boolean"
              ? "<:invisible:816205800031780894>"
              : player.muted == true
                ? "<:online:816205802905665547>"
                : "<:dnd:816205800350416967>"
            } Muted${player.muted
              ? " (" +
              player.punishmentsNew.find((o) => o.type == 'MUTE')?.reason +
              ")"
              : ""
            }` +
            `\n${typeof player.staff != "boolean"
              ? "<:invisible:816205800031780894>"
              : player.staff == true
                ? "<:online:816205802905665547>"
                : "<:dnd:816205800350416967>"
            } Staff${player.staff ? " (" + staffRanks.join(", ") + ")" : ""}`,
          inline: true
        },
        {
          name: '\u200b',
          value: `${typeof flagD(player.flags).hideLastServer != "boolean" ? "<:invisible:816205800031780894>" : flagD(player.flags).hideLastServer == true ? "<:online:816205802905665547>" : "<:dnd:816205800350416967>"} Anonymous Location` +
            `\n${typeof flagD(player.flags).quarantine != "boolean" ? "<:invisible:816205800031780894>" : flagD(player.flags).quarantine == true ? "<:online:816205802905665547>" : "<:dnd:816205800350416967>"} Blacklisted` +
            `\n${typeof flagD(player.flags).hideSkin != "boolean" ? "<:invisible:816205800031780894>" : flagD(player.flags).hideSkin == true ? "<:online:816205802905665547>" : "<:dnd:816205800350416967>"} Hidden Skin`,
          inline: true
        },
        {
          name: '\u200b',
          value: '\u200b',
          inline: true
        },
        {
          name: "<:logino:1001037711886536775> First Log In",
          value: `${player.firstJoined
            ? `<t:${player.firstJoined}>\n(<t:${player.firstJoined}:R>)`
            : "N/A"
            }`,
          inline: true,
        },
        {
          name: "<:logouto:1001038008612556840> Last Log In",
          value: `${player.lastJoined
            ? `<t:${player.lastJoined}>\n(<t:${player.lastJoined}:R>)`
            : "N/A"
            }`,
          inline: true,
        }
      )
      .setFooter(
        `${player.online == true ? "Online" : "Offline"} - ${player.online == true ? "Playing on" : "Last Seen on"
        } ${player.lastServerParsed.pretty}`,
        player.online == true ? client.onlineIco : client.offlineIco
      );

    if (player.bio)
      mainEmbed.setDescription(
        player.bio.length > 4092
          ? player.bio.substring(0, 4093) + "..."
          : player.bio
      );

    return { content: 'Tired of Embeds? Try images! \`/playerpicture [ign]\`', embeds: [mainEmbed], components: comps };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
