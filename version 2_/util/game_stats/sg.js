module.exports = async (client, Discord, res, online, offline) => {
  let data = res.extra;

  if (!data) return "Error: Unknown data";

  return {
    name: res.name,
    game: "Survival Games",
    formattedData: `**Wins:** ${data.sgWins.toLocaleString()}
    **Kills:** ${data.sgKills.toLocaleString()}
    **Deaths:** ${data.sgDeaths.toLocaleString()}
    **K/DR:** (${(!data.sgDeaths
      ? 0
      : data.sgKills / data.sgDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.sgDeaths ? 0 : data.sgKills / data.sgDeaths).toLocaleString(
      "en-US",
      { minimumFractionDigits: 5, maximumFractionDigits: 5 }
    )}
    **W/DR:** (${(!data.sgDeaths
      ? 0
      : data.sgWins / data.sgDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.sgDeaths ? 0 : data.sgWins / data.sgDeaths).toLocaleString(
      "en-US",
      { minimumFractionDigits: 5, maximumFractionDigits: 5 }
    )}
    **Kill Rate:** ${
      !data.sgDeaths
        ? 0
        : Math.round((data.sgKills / (data.sgKills + data.sgDeaths)) * 100)
    }%
    **Death Rate:** ${
      !data.sgDeaths
        ? 0
        : Math.round((data.sgDeaths / (data.sgKills + data.sgDeaths)) * 100)
    }%`,
    rawData: {
      sgWins: data.sgWins,
      sgKills: data.sgKills,
      sgDeaths: data.sgDeaths,
    },
    embed: new Discord.MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setTitle(`${res.name} - Survival Games`)
      .setURL(
        `https://ngmc.co/p/${res.name.replace(/ +/g, "%20")}`
      )
      .setColor(client.color)
      .setThumbnail(
        `https://api.ngmc.co/v1/players/${encodeURIComponent(res.name)}/avatar`
      )
      .setDescription(
        `**Wins:** ${data.sgWins.toLocaleString()}
    **Kills:** ${data.sgKills.toLocaleString()}
    **Deaths:** ${data.sgDeaths.toLocaleString()}
    **K/DR:** (${(!data.sgDeaths
      ? 0
      : data.sgKills / data.sgDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.sgDeaths ? 0 : data.sgKills / data.sgDeaths).toLocaleString(
          "en-US",
          { minimumFractionDigits: 5, maximumFractionDigits: 5 }
        )}
    **W/DR:** (${(!data.sgDeaths
      ? 0
      : data.sgWins / data.sgDeaths
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}) ${(!data.sgDeaths ? 0 : data.sgWins / data.sgDeaths).toLocaleString(
          "en-US",
          { minimumFractionDigits: 5, maximumFractionDigits: 5 }
        )}
    **Kill Rate:** ${
      !data.sgDeaths
        ? 0
        : Math.round((data.sgKills / (data.sgKills + data.sgDeaths)) * 100)
    }%
    **Death Rate:** ${
      !data.sgDeaths
        ? 0
        : Math.round((data.sgDeaths / (data.sgKills + data.sgDeaths)) * 100)
    }%`
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
