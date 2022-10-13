module.exports = async (client, Discord, res, online, offline) => {
  let data = res.extra;

  let summary = [
    `**Wins:** ${data.mmWins.toLocaleString()}`,
    `**Kills:** ${data.mmKills.toLocaleString()}`,
    `**Deaths:** ${data.mmDeaths.toLocaleString()}`,
    `**K/DR:** (${(!data.mmDeaths
      ? 0
      : data.mmKills / data.mmDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.mmDeaths ? 0 : data.mmKills / data.mmDeaths).toLocaleString(
      "en-US",
      { minimumFractionDigits: 5, maximumFractionDigits: 5 }
    )}`,
    `**W/DR:** (${(!data.mmDeaths
      ? 0
      : data.mmWins / data.mmDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.mmDeaths ? 0 : data.mmWins / data.mmDeaths).toLocaleString(
      "en-US",
      { minimumFractionDigits: 5, maximumFractionDigits: 5 }
    )}`,
    `**Kill Rate:** ${
      !data.mmDeaths
        ? 0
        : Math.round((data.mmKills / (data.mmKills + data.mmDeaths)) * 100)
    }%`,
    `**Death Rate:** ${
      !data.mmDeaths
        ? 0
        : Math.round((data.mmDeaths / (data.mmKills + data.mmDeaths)) * 100)
    }%`,
    `**Bow Kills:** ${data.mmBowKills.toLocaleString()}`,
    `**Knife Kills:** ${data.mmKnifeKills.toLocaleString()}`,
    `**Thrown Knife Kills:** ${data.mmThrowKnifeKills.toLocaleString()}`,
  ];
  let classic = [
    `**Wins:** ${data.mmClassicWins.toLocaleString()}`,
    `**Kills:** ${data.mmClassicKills.toLocaleString()}`,
    `**Deaths:** ${data.mmClassicDeaths.toLocaleString()}`,
    `**K/DR:** (${(!data.mmClassicDeaths
      ? 0
      : data.mmClassicKills / data.mmClassicDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.mmClassicDeaths
      ? 0
      : data.mmClassicKills / data.mmClassicDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**W/DR:** (${(!data.mmClassicDeaths
      ? 0
      : data.mmClassicWins / data.mmClassicDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.mmClassicDeaths
      ? 0
      : data.mmClassicWins / data.mmClassicDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**Kill Rate:** ${
      !data.mmClassicDeaths
        ? 0
        : Math.round(
            (data.mmClassicKills /
              (data.mmClassicKills + data.mmClassicDeaths)) *
              100
          )
    }%`,
    `**Death Rate:** ${
      !data.mmClassicDeaths
        ? 0
        : Math.round(
            (data.mmClassicDeaths /
              (data.mmClassicKills + data.mmClassicDeaths)) *
              100
          )
    }%`,
  ];
  let infection = [
    `**Wins:** ${data.mmInfectionWins.toLocaleString()}`,
    `**Kills:** ${data.mmInfectionKills.toLocaleString()}`,
    `**Deaths:** ${data.mmInfectionDeaths.toLocaleString()}`,
    `**K/DR:** (${(!data.mmInfectionDeaths
      ? 0
      : data.mmInfectionKills / data.mmInfectionDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.mmInfectionDeaths
      ? 0
      : data.mmInfectionKills / data.mmInfectionDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**W/DR:** (${(!data.mmInfectionDeaths
      ? 0
      : data.mmInfectionWins / data.mmInfectionDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.mmInfectionDeaths
      ? 0
      : data.mmInfectionWins / data.mmInfectionDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}`,
    `**Kill Rate:** ${
      !data.mmInfectionDeaths
        ? 0
        : Math.round(
            (data.mmInfectionKills /
              (data.mmInfectionKills + data.mmInfectionDeaths)) *
              100
          )
    }%`,
    `**Death Rate:** ${
      !data.mmInfectionDeaths
        ? 0
        : Math.round(
            (data.mmInfectionDeaths /
              (data.mmInfectionKills + data.mmInfectionDeaths)) *
              100
          )
    }%`,
  ];

  return {
    name: res.name,
    game: "Murder Mystery",
    formattedData: summary.join("\n"),
    formattedDataAsFields: {
      summary: summary,
      classic: classic,
      infection: infection,
    },
    rawData: {
      mmKills: data.mmKills,
      mmDeaths: data.mmDeaths,
      mmClassicKills: data.mmClassicKills,
      mmClassicDeaths: data.mmClassicDeaths,
      mmInfectionKills: data.mmInfectionKills,
      mmInfectionDeaths: data.mmInfectionDeaths,
      mmBowKills: data.mmBowKills,
      mmKnifeKills: data.mmKnifeKills,
      mmThrowKnifeKills: data.mmThrowKnifeKills,
      mmWins: data.mmWins,
      mmClassicWins: data.mmClassicWins,
      mmInfectionWins: data.mmInfectionWins,
    },
    embed: new Discord.MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setTitle(`${res.name} - Murder Mystery`)
      .setURL(
        `https://ngmc.co/p/${res.name.replace(/ +/g, "%20")}`
      )
      .setColor(client.color)
      .setThumbnail(
        `https://api.ngmc.co/v1/players/${encodeURIComponent(res.name)}/avatar`
      )
      .addFields(
        { name: "Summary", value: summary.join("\n"), inline: true },
        { name: "Classic", value: classic.join("\n"), inline: true },
        { name: "Infection", value: infection.join("\n") }
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
