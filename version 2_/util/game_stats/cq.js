module.exports = async (client, Discord, res, online, offline) => {
  let data = res.extra;

  if (!data) return "Error: Unknown data";

  let summary = [
    `**Wins:** ${data.cqWins?.toLocaleString()}`,
    `**Kills:** ${data.cqKills?.toLocaleString()}`,
    `**Deaths:** ${data.cqDeaths?.toLocaleString()}`,
    `**K/DR:** (${(!data.cqDeaths
      ? 0
      : data.cqKills / data.cqDeaths
    )?.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.cqDeaths ? 0 : data.cqKills / data.cqDeaths)?.toLocaleString(
      "en-US",
      { minimumFractionDigits: 5, maximumFractionDigits: 5 }
    )}`,
    `**W/DR:** (${(!data.cqDeaths
      ? 0
      : data.cqWins / data.cqDeaths
    )?.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.cqDeaths ? 0 : data.cqWins / data.cqDeaths)?.toLocaleString(
      "en-US",
      { minimumFractionDigits: 5, maximumFractionDigits: 5 }
    )}`,
    `**Kill Rate:** ${
      !data.cqDeaths
        ? "0"
        : Math.round((data.cqKills / (data.cqKills + data.cqDeaths)) * 100)
    }%`,
    `**Death Rate:** ${
      !data.cqDeaths
        ? "0"
        : Math.round((data.cqDeaths / (data.cqKills + data.cqDeaths)) * 100)
    }%`,
    `<:mc_banner:865781352371847189> **Captured:** ${data.cqFlagsCaptured.toLocaleString()}`,
    `<:mc_banner:865781352371847189> **Collected:** ${data.cqFlagsCollected.toLocaleString()}`,
  ];
  let squads = [
    `**Wins:** ${data.cqSquadsWins?.toLocaleString()}`,
    `**Kills:** ${data.cqSquadsKills?.toLocaleString()}`,
    `**Deaths:** ${data.cqSquadsDeaths?.toLocaleString()}`,
    `**K/DR:** (${(!data.cqSquadsDeaths
      ? 0
      : data.cqSquadsKills / data.cqSquadsDeaths
    )?.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.cqSquadsDeaths
      ? 0
      : data.cqSquadsKills / data.cqSquadsDeaths
    )?.toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**W/DR:** (${(!data.cqSquadsDeaths
      ? 0
      : data.cqSquadsWins / data.cqSquadsDeaths
    )?.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.cqSquadsDeaths
      ? 0
      : data.cqSquadsWins / data.cqSquadsDeaths
    )?.toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**Kill Rate:** ${
      !data.cqSquadsDeaths
        ? "0"
        : Math.round(
            (data.cqSquadsKills / (data.cqSquadsKills + data.cqSquadsDeaths)) *
              100
          )
    }%`,
    `**Death Rate:** ${
      !data.cqSquadsDeaths
        ? "0"
        : Math.round(
            (data.cqSquadsDeaths / (data.cqSquadsKills + data.cqSquadsDeaths)) *
              100
          )
    }%`,
    `<:mc_banner:865781352371847189> **Captured:** ${data.cqSquadsFlagsCaptured?.toLocaleString()}`,
  ];
  let mega = [
    `**Wins:** ${data.cqMegaWins?.toLocaleString()}`,
    `**Kills:** ${data.cqMegaKills?.toLocaleString()}`,
    `**Deaths:** ${data.cqMegaDeaths?.toLocaleString()}`,
    `**K/DR:** (${(!data.cqMegaDeaths
      ? 0
      : data.cqMegaKills / data.cqMegaDeaths
    )?.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.cqMegaDeaths
      ? 0
      : data.cqMegaKills / data.cqMegaDeaths
    )?.toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**W/DR:** (${(!data.cqMegaDeaths
      ? 0
      : data.cqMegaWins / data.cqMegaDeaths
    )?.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.cqMegaDeaths
      ? 0
      : data.cqMegaWins / data.cqMegaDeaths
    )?.toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**Kill Rate:** ${
      !data.cqMegaDeaths
        ? "0"
        : Math.round(
            (data.cqMegaKills / (data.cqMegaKills + data.cqMegaDeaths)) * 100
          )
    }%`,
    `**Death Rate:** ${
      !data.cqMegaDeaths
        ? "0"
        : Math.round(
            (data.cqMegaDeaths / (data.cqMegaKills + data.cqMegaDeaths)) * 100
          )
    }%`,
    `<:mc_banner:865781352371847189> **Captured:** ${data.cqMegaFlagsCaptured?.toLocaleString()}`,
  ];
  let misc = [
    `**Diamonds Collected:** ${data.cqDiamondsCollected?.toLocaleString()}`,
    `**Emeralds Collected:** ${data.cqEmeraldsCollected?.toLocaleString()}`,
    `**Gold Collected:** ${data.cqGoldCollected?.toLocaleString()}`,
    `**Iron Collected:** ${data.cqIronCollected?.toLocaleString()}`,
  ];

  return {
    name: res.name,
    game: "Capute The Flag",
    formattedData: summary.join("\n"),
    formattedDataAsFields: {
      summary: summary,
      squads: squads,
      mega: mega,
    },
    rawData: {
      cqDeaths: data.cqDeaths,
      cqKills: data.cqKills,
      cqMegaDeaths: data.cqMegaDeaths,
      cqMegaKills: data.cqMegaKills,
      cqMegaWins: data.cqMegaWins,
      cqSquadsDeaths: data.cqSquadsDeaths,
      cqSquadsKills: data.cqSquadsKills,
      cqSquadsWins: data.cqSquadsWins,
      cqWins: data.cqWins,
      cqDiamondsCollected: data.cqDiamondsCollected,
      cqEmeraldsCollected: data.cqEmeraldsCollected,
      cqFlagsCaptured: data.cqFlagsCaptured,
      cqFlagsCollected: data.cqFlagsCollected,
      cqGoldCollected: data.cqGoldCollected,
      cqIronCollected: data.cqIronCollected,
      cqMegaFlagsCaptured: data.cqMegaFlagsCaptured,
      cqSquadsFlagsCaptured: data.cqSquadsFlagsCaptured,
    },
    embed: new Discord.MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setTitle(`${res.name} - Conquests`)
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
        { name: "Squads", value: squads.join("\n"), inline: true },
        { name: "Mega", value: mega.join("\n"), inline: true },
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
