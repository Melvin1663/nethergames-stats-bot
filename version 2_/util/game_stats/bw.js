module.exports = async (client, Discord, res, online, offline) => {
  let data = res.extra;

  if (!data) return "Error: Unknown data";

  let comp = [
    {
      name: "Solo",
      value:
        data.bwSoloWins +
        data.bwSoloKills +
        data.bwSoloFinalKills -
        data.bwSoloDeaths,
    },
    {
      name: "Doubles",
      value:
        data.bwDoublesWins +
        data.bwDoublesKills +
        data.bwDoublesFinalKills -
        data.bwDoublesDeaths,
    },
    {
      name: "Trios",
      value:
        data.bwTriosWins +
        data.bwTriosKills +
        data.bwTriosFinalKills -
        data.bwTriosDeaths,
    },
    {
      name: "Squads",
      value:
        data.bwSquadsWins +
        data.bwSquadsKills +
        data.bwSquadsFinalKills -
        data.bwSquadsDeaths,
    },
  ];

  comp.sort((a, b) => {
    const bandA = a.value;
    const bandB = b.value;

    let comparison = 0;
    if (bandA > bandB) comparison = 1;
    else if (bandA < bandB) comparison = -1;
    return comparison * -1;
  });

  let summary = [
    `**Wins:** ${data.bwWins.toLocaleString()}`,
    `**Kills:** ${data.bwKills.toLocaleString()}`,
    `**Deaths:** ${data.bwDeaths.toLocaleString()}`,
    `**K/DR:** (${(!data.bwDeaths
      ? 0
      : data.bwKills / data.bwDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwKills ? 0 : data.bwKills / data.bwDeaths).toLocaleString(
      "en-US",
      { minimumFractionDigits: 5, maximumFractionDigits: 5 }
    )}`,
    `**FK/DR:** (${(!data.bwDeaths
      ? 0
      : data.bwFinalKills / data.bwDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwDeaths
      ? 0
      : data.bwFinalKills / data.bwDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**W/DR:** (${(!data.bwDeaths
      ? 0
      : data.bwWins / data.bwDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwDeaths ? 0 : data.bwWins / data.bwDeaths).toLocaleString(
      "en-US",
      { minimumFractionDigits: 5, maximumFractionDigits: 5 }
    )}`,
    `**BB/DR:** (${(!data.bwDeaths
      ? 0
      : data.bwBedsBroken / data.bwDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwDeaths
      ? 0
      : data.bwBedsBroken / data.bwDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**Kill Rate:** ${
      !data.bwDeaths
        ? 0
        : Math.round((data.bwKills / (data.bwKills + data.bwDeaths)) * 100)
    }%`,
    `**FKill Rate:** ${
      !data.bwDeaths
        ? 0
        : Math.round((data.bwFinalKills / (data.bwKills + data.bwDeaths)) * 100)
    }%`,
    `**Death Rate:** ${
      !data.bwDeaths
        ? 0
        : Math.round((data.bwDeaths / (data.bwKills + data.bwDeaths)) * 100)
    }%`,
    `<:mc_bed:865775329817919498> **Broken:** ${data.bwBedsBroken.toLocaleString()}`,
    `**Final Kills:** ${data.bwFinalKills.toLocaleString()}`,
  ];
  let solo = [
    `**Wins:** ${data.bwSoloWins.toLocaleString()}`,
    `**Kills**: ${data.bwSoloKills.toLocaleString()}`,
    `**Deaths:** ${data.bwSoloDeaths.toLocaleString()}`,
    `**K/DR:** (${(!data.bwSoloDeaths
      ? 0
      : data.bwSoloKills / data.bwSoloDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwSoloKills
      ? 0
      : data.bwSoloKills / data.bwSoloDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**FK/DR:** (${(!data.bwSoloDeaths
      ? 0
      : data.bwSoloFinalKills / data.bwSoloDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwSoloDeaths
      ? 0
      : data.bwSoloFinalKills / data.bwSoloDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**W/DR:** (${(!data.bwSoloDeaths
      ? 0
      : data.bwSoloWins / data.bwSoloDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwSoloDeaths
      ? 0
      : data.bwSoloWins / data.bwSoloDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**BB/DR:** (${(!data.bwSoloDeaths
      ? 0
      : data.bwSoloBedsBroken / data.bwSoloDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwSoloDeaths
      ? 0
      : data.bwSoloBedsBroken / data.bwSoloDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**Kill Rate:** ${
      !data.bwSoloDeaths
        ? 0
        : Math.round(
            (data.bwSoloKills / (data.bwSoloKills + data.bwSoloDeaths)) * 100
          )
    }%`,
    `**FKill Rate:** ${
      !data.bwSoloDeaths
        ? 0
        : Math.round(
            (data.bwSoloFinalKills / (data.bwSoloKills + data.bwSoloDeaths)) *
              100
          )
    }%`,
    `**Death Rate:** ${
      !data.bwSoloDeaths
        ? 0
        : Math.round(
            (data.bwSoloDeaths / (data.bwSoloKills + data.bwSoloDeaths)) * 100
          )
    }%`,
    `<:mc_bed:865775329817919498> **Broken:** ${data.bwSoloBedsBroken.toLocaleString()}`,
    `**Final Kills:** ${data.bwSoloFinalKills.toLocaleString()}`,
  ];
  let duo = [
    `**Wins:** ${data.bwDoublesWins.toLocaleString()}`,
    `**Kills**: ${data.bwDoublesKills.toLocaleString()}`,
    `**Deaths:** ${data.bwDoublesDeaths.toLocaleString()}`,
    `**K/DR:** (${(!data.bwDoublesDeaths
      ? 0
      : data.bwDoublesKills / data.bwDoublesDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwDoublesKills
      ? 0
      : data.bwDoublesKills / data.bwDoublesDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**FK/DR:** (${(!data.bwDoublesDeaths
      ? 0
      : data.bwDoublesFinalKills / data.bwDoublesDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwDoublesDeaths
      ? 0
      : data.bwDoublesFinalKills / data.bwDoublesDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**W/DR:** (${(!data.bwDoublesDeaths
      ? 0
      : data.bwDoublesWins / data.bwDoublesDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwDoublesDeaths
      ? 0
      : data.bwDoublesWins / data.bwDoublesDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**BB/DR:** (${(!data.bwDoublesDeaths
      ? 0
      : data.bwDoublesBedsBroken / data.bwDoublesDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwDoublesDeaths
      ? 0
      : data.bwDoublesBedsBroken / data.bwDoublesDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**Kill Rate:** ${
      !data.bwDoublesDeaths
        ? 0
        : Math.round(
            (data.bwDoublesKills /
              (data.bwDoublesKills + data.bwDoublesDeaths)) *
              100
          )
    }%`,
    `**FKill Rate:** ${
      !data.bwDoublesDeaths
        ? 0
        : Math.round(
            (data.bwDoublesFinalKills /
              (data.bwDoublesKills + data.bwDoublesDeaths)) *
              100
          )
    }%`,
    `**Death Rate:** ${
      !data.bwDoublesDeaths
        ? 0
        : Math.round(
            (data.bwDoublesDeaths /
              (data.bwDoublesKills + data.bwDoublesDeaths)) *
              100
          )
    }%`,
    `<:mc_bed:865775329817919498> **Broken:** ${data.bwDoublesBedsBroken.toLocaleString()}`,
    `**Final Kills:** ${data.bwDoublesFinalKills.toLocaleString()}`,
  ];
  let triples = [
    `**Wins:** ${data.bwTriosWins.toLocaleString()}`,
    `**Kills**: ${data.bwTriosKills.toLocaleString()}`,
    `**Deaths:** ${data.bwTriosDeaths.toLocaleString()}`,
    `**K/DR:** (${(!data.bwTriosDeaths
      ? 0
      : data.bwTriosKills / data.bwTriosDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwTriosKills
      ? 0
      : data.bwTriosKills / data.bwTriosDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**FK/DR:** (${(!data.bwTriosDeaths
      ? 0
      : data.bwTriosFinalKills / data.bwTriosDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwTriosDeaths
      ? 0
      : data.bwTriosFinalKills / data.bwTriosDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**W/DR:** (${(!data.bwTriosDeaths
      ? 0
      : data.bwTriosWins / data.bwTriosDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwTriosDeaths
      ? 0
      : data.bwTriosWins / data.bwTriosDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**BB/DR:** (${(!data.bwTriosDeaths
      ? 0
      : data.bwTriosBedsBroken / data.bwTriosDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwTriosDeaths
      ? 0
      : data.bwTriosBedsBroken / data.bwTriosDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**Kill Rate:** ${
      !data.bwTriosDeaths
        ? 0
        : Math.round(
            (data.bwTriosKills / (data.bwTriosKills + data.bwTriosDeaths)) * 100
          )
    }%`,
    `**FKill Rate:** ${
      !data.bwTriosDeaths
        ? 0
        : Math.round(
            (data.bwTriosFinalKills /
              (data.bwTriosKills + data.bwTriosDeaths)) *
              100
          )
    }%`,
    `**Death Rate:** ${
      !data.bwTriosDeaths
        ? 0
        : Math.round(
            (data.bwTriosDeaths / (data.bwTriosKills + data.bwTriosDeaths)) *
              100
          )
    }%`,
    `<:mc_bed:865775329817919498> **Broken:** ${data.bwTriosBedsBroken.toLocaleString()}`,
    `**Final Kills:** ${data.bwTriosFinalKills.toLocaleString()}`,
  ];
  let squads = [
    `**Wins:** ${data.bwSquadsWins.toLocaleString()}`,
    `**Kills**: ${data.bwSquadsKills.toLocaleString()}`,
    `**Deaths:** ${data.bwSquadsDeaths.toLocaleString()}`,
    `**K/DR:** (${(!data.bwSquadsDeaths
      ? 0
      : data.bwSquadsKills / data.bwSquadsDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwSquadsKills
      ? 0
      : data.bwSquadsKills / data.bwSquadsDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**FK/DR:** (${(!data.bwSquadsDeaths
      ? 0
      : data.bwSquadsFinalKills / data.bwSquadsDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwSquadsDeaths
      ? 0
      : data.bwSquadsFinalKills / data.bwSquadsDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**W/DR:** (${(!data.bwSquadsDeaths
      ? 0
      : data.bwSquadsWins / data.bwSquadsDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwSquadsDeaths
      ? 0
      : data.bwSquadsWins / data.bwSquadsDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**BB/DR:** (${(!data.bwSquadsDeaths
      ? 0
      : data.bwSquadsBedsBroken / data.bwSquadsDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.bwSquadsDeaths
      ? 0
      : data.bwSquadsBedsBroken / data.bwSquadsDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**Kill Rate:** ${
      !data.bwSquadsDeaths
        ? 0
        : Math.round(
            (data.bwSquadsKills / (data.bwSquadsKills + data.bwSquadsDeaths)) *
              100
          )
    }%`,
    `**FKill Rate:** ${
      !data.bwSquadsDeaths
        ? 0
        : Math.round(
            (data.bwSquadsFinalKills /
              (data.bwSquadsKills + data.bwSquadsDeaths)) *
              100
          )
    }%`,
    `**Death Rate:** ${
      !data.bwSquadsDeaths
        ? 0
        : Math.round(
            (data.bwSquadsDeaths / (data.bwSquadsKills + data.bwSquadsDeaths)) *
              100
          )
    }%`,
    `<:mc_bed:865775329817919498> **Broken:** ${data.bwSquadsBedsBroken.toLocaleString()}`,
    `**Final Kills:** ${data.bwSquadsFinalKills.toLocaleString()}`,
  ];
  let misc = [
    `**Loot Collected:** ${(
      data.bwDiamondsCollected +
      data.bwEmeraldsCollected +
      data.bwGoldCollected +
      data.bwIronCollected
    ).toLocaleString()}`,
    `<:diamond:865587581546790942> **Collected:** ${data.bwDiamondsCollected.toLocaleString()}`,
    `<:emerald:865587672456888380> **Collected**: ${data.bwEmeraldsCollected.toLocaleString()}`,
    `<:gold_ingot:865587747216293919> **Collected**: ${data.bwGoldCollected.toLocaleString()}`,
    `<:iron_ingot:865587820524732437> **Collected:** ${data.bwIronCollected.toLocaleString()}`,
    `**Best Mode:** ${comp[0].name}`,
  ];

  return {
    name: res.name,
    game: "Bedwars",
    formattedData: summary.join("\n"),
    formattedDataAsFields: {
      summary: summary,
      solos: solo,
      doubles: duo,
      trios: triples,
      squads: squads,
      misc: misc,
    },
    rawData: {
      bwKills: data.bwKills,
      bwDeaths: data.bwDeaths,
      bwSoloKills: data.bwSoloKills,
      bwSoloDeaths: data.bwSoloDeaths,
      bwDoublesKills: data.bwDoublesKills,
      bwDoublesDeaths: data.bwDoublesDeaths,
      bwTriosKills: data.bwTriosKills,
      bwTriosDeaths: data.bwTriosDeaths,
      bwSquadsKills: data.bwSquadsKills,
      bwSquadsDeaths: data.bwSquadsDeaths,
      bwBedsBroken: data.bwBedsBroken,
      bwSoloBedsBroken: data.bwSoloBedsBroken,
      bwDoublesBedsBroken: data.bwDoublesBedsBroken,
      bwTriosBedsBroken: data.bwTriosBedsBroken,
      bwSquadsBedsBroken: data.bwSquadsBedsBroken,
      bwDiamondsCollected: data.bwDiamondsCollected,
      bwEmeraldsCollected: data.bwEmeraldsCollected,
      bwGoldCollected: data.bwGoldCollected,
      bwIronCollected: data.bwIronCollected,
      bwFinalKills: data.bwFinalKills,
      bwSoloFinalKills: data.bwSoloFinalKills,
      bwDoublesFinalKills: data.bwDoublesFinalKills,
      bwTriosFinalKills: data.bwTriosFinalKills,
      bwSquadsFinalKills: data.bwSquadsFinalKills,
      bwWins: data.bwWins,
      bwSoloWins: data.bwSoloWins,
      bwDoublesWins: data.bwDoublesWins,
      bwTriosWins: data.bwTriosWins,
      bwSquadsWins: data.bwSquadsWins,
    },
    embed: new Discord.MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setTitle(`${res.name} - Bedwars`)
      .setURL(
        `https://ngmc.co/p/${res.name.replace(/ +/g, "%20")}`
      )
      .setColor(client.color)
      .setThumbnail(
        `https://api.ngmc.co/v1/players/${encodeURIComponent(res.name)}/avatar`
      )
      .addFields(
        { name: "Summary", value: summary.join("\n"), inline: true },
        { name: "Misc", value: misc.join("\n"), inline: true },
        { name: "\u200b", value: "\u200b", inline: true },
        { name: "Solos", value: solo.join("\n"), inline: true },
        { name: "Doubles", value: duo.join("\n"), inline: true },
        { name: "\u200b", value: "\u200b", inline: true },
        { name: "Trios", value: triples.join("\n"), inline: true },
        { name: "Squads", value: squads.join("\n"), inline: true },
        { name: "\u200b", value: "\u200b", inline: true }
      )
      .setTimestamp(
        res.online == true ? Date.now() : new Date(res.lastJoin).getTime()
      )
      .setFooter(
        `${res.online == true ? "Online" : "Offline"} - ${
          res.online == true ? "Playing on" : "Last Seen on"
        } ${res.lastServerParsed.pretty}`,
        res.online == true ? online : offline
      ),
  };
};
