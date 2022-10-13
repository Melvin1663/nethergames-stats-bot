module.exports = async (client, Discord, res, online, offline) => {
  let data = res.extra;

  if (!data) return "Error: Unknown data";

  let summary = [
    `**Wins:** ${data.swWins.toLocaleString()}`,
    `**Losses:** ${data.swLosses.toLocaleString()}`,
    `**Kills:** ${data.swKills.toLocaleString()}`,
    `**Deaths:** ${data.swDeaths.toLocaleString()}`,
    `**W/LR:** (${(!data.swLosses
      ? 0
      : data.swWins / data.swLosses
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.swLosses ? 0 : data.swWins / data.swLosses).toLocaleString(
      "en-US",
      { minimumFractionDigits: 5, maximumFractionDigits: 5 }
    )}`,
    `**K/DR:** (${(!data.swDeaths
      ? 0
      : data.swKills / data.swDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.swDeaths ? 0 : data.swKills / data.swDeaths).toLocaleString(
      "en-US",
      { minimumFractionDigits: 5, maximumFractionDigits: 5 }
    )}`,
    `**W/DR:** (${(!data.swDeaths
      ? 0
      : data.swWins / data.swDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.swDeaths ? 0 : data.swWins / data.swDeaths).toLocaleString(
      "en-US",
      { minimumFractionDigits: 5, maximumFractionDigits: 5 }
    )}`,
    `**Win Rate:** ${
      !data.swLosses
        ? 0
        : Math.round((data.swWins / (data.swWins + data.swLosses)) * 100)
    }%`,
    `**Lose Rate:** ${
      !data.swLosses
        ? 0
        : Math.round((data.swLosses / (data.swWins + data.swLosses)) * 100)
    }%`,
    `**Kill Rate:** ${
      !data.swDeaths
        ? 0
        : Math.round((data.swKills / (data.swKills + data.swDeaths)) * 100)
    }%`,
    `**Death Rate:** ${
      !data.swDeaths
        ? 0
        : Math.round((data.swDeaths / (data.swKills + data.swDeaths)) * 100)
    }%`,
    `**Blocks Broken:** ${data.swBlocksBroken.toLocaleString()}`,
    `**Blocks Placed:** ${data.swBlocksPlaced.toLocaleString()}`,
    `<:arrow:865889190889652256> **Shot:** ${data.swArrowsShot.toLocaleString()}`,
    `<:mc_egg:865889603452665856> **Thrown:** ${data.swEggsThrown.toLocaleString()}`,
    `<:ender_pearl:865889810673958942> **Thrown:** ${data.swEpearlsThrown.toLocaleString()}`,
  ];
  let solo = [
    `**Wins:** ${data.swSoloWins.toLocaleString()}`,
    `**Losses:** ${data.swSoloLosses.toLocaleString()}`,
    `**Kills:** ${data.swSoloKills.toLocaleString()}`,
    `**Deaths:** ${data.swSoloDeaths.toLocaleString()}`,
    `**W/LR:** (${(!data.swSoloLosses
      ? 0
      : data.swSoloWins / data.swSoloLosses
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.swSoloLosses
      ? 0
      : data.swSoloWins / data.swSoloLosses
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**K/DR:** (${(!data.swSoloDeaths
      ? 0
      : data.swSoloKills / data.swSoloDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.swSoloDeaths
      ? 0
      : data.swSoloKills / data.swSoloDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**W/DR:** (${(!data.swSoloDeaths
      ? 0
      : data.swSoloWins / data.swSoloDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.swSoloDeaths
      ? 0
      : data.swSoloWins / data.swSoloDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**Win Rate:** ${
      !data.swSoloLosses
        ? 0
        : Math.round(
            (data.swSoloWins / (data.swSoloWins + data.swSoloLosses)) * 100
          )
    }%`,
    `**Lose Rate:** ${
      !data.swSoloLosses
        ? 0
        : Math.round(
            (data.swSoloLosses / (data.swSoloWins + data.swSoloLosses)) * 100
          )
    }%`,
    `**Kill Rate:** ${
      !data.swSoloDeaths
        ? 0
        : Math.round(
            (data.swSoloKills / (data.swSoloKills + data.swSoloDeaths)) * 100
          )
    }%`,
    `**Death Rate:** ${
      !data.swSoloDeaths
        ? 0
        : Math.round(
            (data.swSoloDeaths / (data.swSoloKills + data.swSoloDeaths)) * 100
          )
    }%`,
    `**Normal Kills:** ${data.swSoloNormalKills.toLocaleString()}`,
    `**Normal Deaths:** ${data.swSoloNormalDeaths.toLocaleString()}`,
    `**Normal K/DR:** (${(!data.swSoloNormalDeaths
      ? 0
      : data.swSoloNormalKills / data.swSoloNormalDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.swSoloNormalDeaths
      ? 0
      : data.swSoloNormalKills / data.swSoloNormalDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**Insane Kills:** ${data.swSoloInsaneKills.toLocaleString()}`,
    `**Insane Deaths:** ${data.swSoloInsaneDeaths.toLocaleString()}`,
    `**Insane K/DR:** (${(!data.swSoloInsaneDeaths
      ? 0
      : data.swSoloInsaneKills / data.swSoloInsaneDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.swSoloInsaneDeaths
      ? 0
      : data.swSoloInsaneKills / data.swSoloInsaneDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
  ];
  let duo = [
    `**Wins:** ${data.swDoublesWins.toLocaleString()}`,
    `**Losses:** ${data.swDoublesLosses.toLocaleString()}`,
    `**Kills:** ${data.swDoublesKills.toLocaleString()}`,
    `**Deaths:** ${data.swDoublesDeaths.toLocaleString()}`,
    `**W/LR:** (${(!data.swDoublesLosses
      ? 0
      : data.swDoublesWins / data.swDoublesLosses
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.swDoublesLosses
      ? 0
      : data.swDoublesWins / data.swDoublesLosses
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**K/DR:** (${(!data.swDoublesDeaths
      ? 0
      : data.swDoublesKills / data.swDoublesDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.swDoublesDeaths
      ? 0
      : data.swDoublesKills / data.swDoublesDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**W/DR:** (${(!data.swDoublesDeaths
      ? 0
      : data.swDoublesWins / data.swDoublesDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.swDoublesDeaths
      ? 0
      : data.swDoublesWins / data.swDoublesDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**Win Rate:** ${
      !data.swDoublesLosses
        ? 0
        : Math.round(
            (data.swDoublesWins / (data.swDoublesWins + data.swDoublesLosses)) *
              100
          )
    }%`,
    `**Lose Rate:** ${
      !data.swDoublesLosses
        ? 0
        : Math.round(
            (data.swDoublesLosses /
              (data.swDoublesWins + data.swDoublesLosses)) *
              100
          )
    }%`,
    `**Kill Rate:** ${
      !data.swDoublesDeaths
        ? 0
        : Math.round(
            (data.swDoublesKills /
              (data.swDoublesKills + data.swDoublesDeaths)) *
              100
          )
    }%`,
    `**Death Rate:** ${
      !data.swDoublesDeaths
        ? 0
        : Math.round(
            (data.swDoublesDeaths /
              (data.swDoublesKills + data.swDoublesDeaths)) *
              100
          )
    }%`,
    `**Normal Kills:** ${data.swDoublesNormalKills.toLocaleString()}`,
    `**Normal Deaths:** ${data.swDoublesNormalDeaths.toLocaleString()}`,
    `**Normal K/DR:** (${(!data.swDoublesNormalDeaths
      ? 0
      : data.swDoublesNormalKills / data.swDoublesNormalDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.swDoublesNormalDeaths
      ? 0
      : data.swDoublesNormalKills / data.swDoublesNormalDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**Insane Kills:** ${data.swDoublesInsaneKills.toLocaleString()}`,
    `**Insane Deaths:** ${data.swDoublesInsaneDeaths.toLocaleString()}`,
    `**Insane K/DR:** (${(!data.swDoublesInsaneDeaths
      ? 0
      : data.swDoublesInsaneKills / data.swDoublesInsaneDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.swDoublesInsaneDeaths
      ? 0
      : data.swDoublesInsaneKills / data.swDoublesInsaneDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
  ];

  return {
    name: res.name,
    game: "SkyWars",
    formattedData: summary.join("\n"),
    formattedDataAsFields: {
      summary: summary,
      solos: solo,
      doubles: duo,
    },
    rawData: {
      swKills: data.swKills,
      swDeaths: data.swDeaths,
      swSoloKills: data.swSoloKills,
      swSoloDeaths: data.swSoloDeaths,
      swSoloNormalKills: data.swSoloNormalKills,
      swSoloNormalDeaths: data.swSoloNormalDeaths,
      swSoloInsaneKills: data.swSoloInsaneKills,
      swSoloInsaneDeaths: data.swSoloInsaneDeaths,
      swDoublesKills: data.swDoublesKills,
      swDoublesDeaths: data.swDoublesDeaths,
      swDoublesNormalKills: data.swDoublesNormalKills,
      swDoublesNormalDeaths: data.swDoublesNormalDeaths,
      swDoublesInsaneKills: data.swDoublesInsaneKills,
      swDoublesInsaneDeaths: data.swDoublesInsaneDeaths,
      swBlocksBroken: data.swBlocksBroken,
      swBlocksPlaced: data.swBlocksPlaced,
      swArrowsShot: data.swArrowsShot,
      swEggsThrown: data.swEggsThrown,
      swEpearlsThrown: data.swEpearlsThrown,
      swWins: data.swWins,
      swSoloWins: data.swSoloWins,
      swDoublesWins: data.swDoublesWins,
      swLosses: data.swLosses,
      swSoloLosses: data.swSoloLosses,
      swDoublesLosses: data.swDoublesLosses,
    },
    embed: new Discord.MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setTitle(`${res.name} - SkyWars`)
      .setURL(
        `https://ngmc.co/p/${res.name.replace(/ +/g, "%20")}`
      )
      .setColor(client.color)
      .setThumbnail(
        `https://api.ngmc.co/v1/players/${encodeURIComponent(res.name)}/avatar`
      )
      .addFields(
        { name: "Summary", value: summary.join("\n"), inline: true },
        { name: "Solo", value: solo.join("\n"), inline: true },
        { name: "Doubles", value: duo.join("\n") }
      )
      .setTimestamp(
        res.online == true ? Date.now() : new Date(res.lastJoin).getTime()
      )
      .setFooter(
        `${res.online == true ? "Online" : "Offline"} - ${
          res.online == true ? "Playing on" : "Last Seen on"
        } ${res.lastServerParsed.pretty} `,
        res.online == true ? online : offline
      ),
  };
};
