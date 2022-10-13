module.exports = async (client, Discord, res, online, offline) => {
  let data = res.extra;

  if (!data) return "Error: Unknown data";

  return {
    name: res.name,
    game: "The Bridge",
    formattedData: `**Wins:** ${data.tbWins.toLocaleString()}
    **Losses:** ${data.tbLosses.toLocaleString()}
    **Kills:** ${data.tbKills.toLocaleString()}
    **Deaths:** ${data.tbDeaths.toLocaleString()}
    **W/LR:** (${(!data.tbLosses
      ? 0
      : data.tbWins / data.tbLosses
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.tbLosses ? 0 : data.tbWins / data.tbLosses).toLocaleString(
      "en-US",
      { minimumFractionDigits: 5, maximumFractionDigits: 5 }
    )}
    **K/DR:** (${(!data.tbDeaths
      ? 0
      : data.tbKills / data.tbDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.tbDeaths ? 0 : data.tbKills / data.tbDeaths).toLocaleString(
      "en-US",
      { minimumFractionDigits: 5, maximumFractionDigits: 5 }
    )}
    **W/DR:** (${(!data.tbDeaths
      ? 0
      : data.tbWins / data.tbDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.tbDeaths ? 0 : data.tbWins / data.tbDeaths).toLocaleString(
      "en-US",
      { minimumFractionDigits: 5, maximumFractionDigits: 5 }
    )}
    **Kill Rate:** ${Math.round(
      (data.tbKills / (data.tbKills + data.tbDeaths)) * 100
    )}%
    **Death Rate:** ${Math.round(
      (data.tbDeaths / (data.tbKills + data.tbDeaths)) * 100
    )}%
    **Win Rate:** ${Math.round(
      (data.tbWins / (data.tbWins + data.tbLosses)) * 100
    )}%
    **Lose Rate:** ${Math.round(
      (data.tbLosses / (data.tbWins + data.tbLosses)) * 100
    )}%
    **Goals:** ${data.tbGoals.toLocaleString()}
    **Melee Hits:** ${data.tbMeleeHits.toLocaleString()}
    <:arrow:865889190889652256> **Shot:** ${data.tbArrowsShot.toLocaleString()}`,
    rawData: {
      tbKills: data.tbKills,
      tbDeaths: data.tbDeaths,
      tbArrowsShot: data.tbArrowsShot,
      tbMeleeHits: data.tbMeleeHits,
      tbGoals: data.tbGoals,
      tbWins: data.tbWins,
      tbLosses: data.tbLosses,
    },
    embed: new Discord.MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setTitle(`${res.name} - The Bridge`)
      .setURL(
        `https://ngmc.co/p/${res.name.replace(/ +/g, "%20")}`
      )
      .setColor(client.color)
      .setThumbnail(
        `https://api.ngmc.co/v1/players/${encodeURIComponent(res.name)}/avatar`
      )
      .setDescription(
        `**Wins:** ${data.tbWins.toLocaleString()}
    **Losses:** ${data.tbLosses.toLocaleString()}
    **Kills:** ${data.tbKills.toLocaleString()}
    **Deaths:** ${data.tbDeaths.toLocaleString()}
    **W/LR:** (${(!data.tbLosses
      ? 0
      : data.tbWins / data.tbLosses
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.tbLosses ? 0 : data.tbWins / data.tbLosses).toLocaleString(
          "en-US",
          { minimumFractionDigits: 5, maximumFractionDigits: 5 }
        )}
    **K/DR:** (${(!data.tbDeaths
      ? 0
      : data.tbKills / data.tbDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.tbDeaths ? 0 : data.tbKills / data.tbDeaths).toLocaleString(
          "en-US",
          { minimumFractionDigits: 5, maximumFractionDigits: 5 }
        )}
    **W/DR:** (${(!data.tbDeaths
      ? 0
      : data.tbWins / data.tbDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.tbDeaths ? 0 : data.tbWins / data.tbDeaths).toLocaleString(
          "en-US",
          { minimumFractionDigits: 5, maximumFractionDigits: 5 }
        )}
    **Kill Rate:** ${
      !data.tbDeaths
        ? 0
        : Math.round((data.tbKills / (data.tbKills + data.tbDeaths)) * 100)
    }%
    **Death Rate:** ${
      !data.tbDeaths
        ? 0
        : Math.round((data.tbDeaths / (data.tbKills + data.tbDeaths)) * 100)
    }%
    **Win Rate:** ${
      !data.tbLosses
        ? 0
        : Math.round((data.tbWins / (data.tbWins + data.tbLosses)) * 100)
    }%
    **Lose Rate:** ${
      !data.tbLosses
        ? 0
        : Math.round((data.tbLosses / (data.tbWins + data.tbLosses)) * 100)
    }%
    **Goals:** ${data.tbGoals.toLocaleString()}
    **Melee Hits:** ${data.tbMeleeHits.toLocaleString()}
    <:arrow:865889190889652256> **Shot:** ${data.tbArrowsShot.toLocaleString()}`
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
