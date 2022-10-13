module.exports = async (client, Discord, res, online, offline) => {
  let data = res.extra;

  if (!data) return "Error: Unknown data";

  return {
    name: res.name,
    game: "Block Hunt",
    formattedData: `**Total Wins:** ${data.bhWins}`,
    rawData: {
      bhWins: data.bhWins,
    },
    embed: new Discord.MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setTitle(`${res.name} - Block Hunt`)
      .setURL(
        `https://ngmc.co/p/${res.name.replace(/ +/g, "%20")}`
      )
      .setColor(client.color)
      .setThumbnail(
        `https://api.ngmc.co/v1/players/${encodeURIComponent(res.name)}/avatar`
      )
      .setDescription(`**Total Wins:** ${data.bhWins}`)
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
