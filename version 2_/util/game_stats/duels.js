module.exports = async (client, Discord, res, online, offline) => {
  let data = res.extra;

  if (!data) return "Error: Unknown data";

  return {
    name: res.name,
    game: "Duels",
    formattedData: `**Wins:** ${data.duelsWins.toLocaleString()}
    **Loses:** ${data.duelsLosses.toLocaleString()}
    **Kills:** ${data.duelsKills.toLocaleString()}
    **Deaths:** ${data.duelsDeaths.toLocaleString()}
    **W/LR:** (${(!data.duelsLosses
      ? 0
      : data.duelsWins / data.duelsLosses
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.duelsLosses
      ? 0
      : data.duelsWins / data.duelsLosses
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}
    **K/DR:** (${(!data.duelsDeaths
      ? 0
      : data.duelsKills / data.duelsDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.duelsDeaths
      ? 0
      : data.duelsKills / data.duelsDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}
    **W/DR:** (${(!data.duelsDeaths
      ? 0
      : data.duelsWins / data.duelsDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.duelsDeaths
      ? 0
      : data.duelsWins / data.duelsDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })}
    **Kill Rate:** ${
      !data.duelsDeaths
        ? 0
        : Math.round(
            (data.duelsKills / (data.duelsKills + data.duelsDeaths)) * 100
          )
    }%
    **Death Rate:** ${
      !data.duelsDeaths
        ? 0
        : Math.round(
            (data.duelsDeaths / (data.duelsKills + data.duelsDeaths)) * 100
          )
    }%
    **Win Rate:** ${
      !data.duelsLosses
        ? 0
        : Math.round(
            (data.duelsWins / (data.duelsWins + data.duelsLosses)) * 100
          )
    }%
    **Lose Rate:** ${
      !data.duelsLosses
        ? 0
        : Math.round(
            (data.duelsLosses / (data.duelsWins + data.duelsLosses)) * 100
          )
    }%
    **Arrows Shot:** ${data.duelsArrowsShot.toLocaleString()}
    **Melee Hits:** ${data.duelsMeleeHits.toLocaleString()}`,
    rawData: {
      duelsKills: data.duelsKills,
      duelsDeaths: data.duelsDeaths,
      duelsArrowsShot: data.duelsArrowsShot,
      duelsMeleeHits: data.duelsMeleeHits,
      duelsWins: data.duelsWins,
      duelsLosses: data.duelsLosses,
    },
    embed: new Discord.MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setTitle(`${res.name} - Duels`)
      .setURL(
        `https://ngmc.co/p/${res.name.replace(/ +/g, "%20")}`
      )
      .setColor(client.color)
      .setThumbnail(
        `https://api.ngmc.co/v1/players/${encodeURIComponent(res.name)}/avatar`
      )
      .setDescription(
        `**Wins:** ${data.duelsWins.toLocaleString()}
    **Loses:** ${data.duelsLosses.toLocaleString()}
    **Kills:** ${data.duelsKills.toLocaleString()}
    **Deaths:** ${data.duelsDeaths.toLocaleString()}
    **W/LR:** (${(!data.duelsLosses
      ? 0
      : data.duelsWins / data.duelsLosses
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.duelsLosses
          ? 0
          : data.duelsWins / data.duelsLosses
        ).toLocaleString("en-US", {
          minimumFractionDigits: 5,
          maximumFractionDigits: 5,
        })}
    **K/DR:** (${(!data.duelsDeaths
      ? 0
      : data.duelsKills / data.duelsDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.duelsDeaths
          ? 0
          : data.duelsKills / data.duelsDeaths
        ).toLocaleString("en-US", {
          minimumFractionDigits: 5,
          maximumFractionDigits: 5,
        })}
    **W/DR:** (${(!data.duelsDeaths
      ? 0
      : data.duelsWins / data.duelsDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.duelsDeaths
          ? 0
          : data.duelsWins / data.duelsDeaths
        ).toLocaleString("en-US", {
          minimumFractionDigits: 5,
          maximumFractionDigits: 5,
        })}
    **Kill Rate:** ${
      !data.duelsDeaths
        ? 0
        : Math.round(
            (data.duelsKills / (data.duelsKills + data.duelsDeaths)) * 100
          )
    }%
    **Death Rate:** ${
      !data.duelsDeaths
        ? 0
        : Math.round(
            (data.duelsDeaths / (data.duelsKills + data.duelsDeaths)) * 100
          )
    }%
    **Win Rate:** ${
      !data.duelsLosses
        ? 0
        : Math.round(
            (data.duelsWins / (data.duelsWins + data.duelsLosses)) * 100
          )
    }%
    **Lose Rate:** ${
      !data.duelsLosses
        ? 0
        : Math.round(
            (data.duelsLosses / (data.duelsWins + data.duelsLosses)) * 100
          )
    }%
    **Arrows Shot:** ${data.duelsArrowsShot.toLocaleString()}
    **Melee Hits:** ${data.duelsMeleeHits.toLocaleString()}`
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
