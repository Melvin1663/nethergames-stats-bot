const get = require("node-fetch2");
const ngblade = require("../../../schemas/ngblade");

module.exports = async (json, client, Discord, int) => {
  if (!json.data)
    return int.reply({
      content: "The Interaction contained incomplete information",
      ephemeral: true,
    });
  if (!int.deffered && !int.replied) await int.deferReply().catch(console.log);

  let guild = await get(
    `https://api.ngmc.co/v1/guilds/${json.data}?expand=true`,
    { headers: { Authorization: client.ngKey } }
  ).catch(console.log);
  if (!guild) return "Unable to fetch the guild";
  if (guild.status >= 400) {
    if (guild.status == 404)
      return int.editReply(`<:erroro:1001073206389649408> Guild not found: ${json.data}`);
    if (guild.status == 429) {
      console.log("Failed to fetch: Status 429");
      return int.editReply(`You are being rate limited`);
    }
    if (guild.status == 502)
      return int.editReply(
        `Recieved an Invalid response from the server, please try again later.`
      );
    if (guild.status == 522)
      return int.editReply(
        `Connection to the NG API Timed out, try again later.`
      );
    if ([521, 503].includes(guild.status))
      return int.editReply(
        `The API is currently offline, please try again later.`
      );
    else return int.editReply(`Status ${guild.status}: ${guild.statusText}`);
  }

  guild = await guild.json();

  let playerList = guild.officers
    .map((p) => p.xuid)
    .concat(...guild.members.map((p) => p.xuid))
    .concat(...[guild.leader.xuid]);
  let playerNames = guild.officers
    .map((p) => p.name)
    .concat(...guild.members.map((p) => p.name))
    .concat(...[guild.leader.name]);
  let res = [];
  let ngdata = await ngblade.find({ id: { $in: playerList } });

  // playerList.forEach((pid, i) => {
  //     // console.log(pid)
  //     let arr = [];
  //     let d = ngdata[ngdata.indexOf(ngdata.find(s => s.id == pid))]
  //     console.log(d)
  //     if (!d) res.push({ name: playerNames[i], value: 'N/A' })
  //     else {
  //         d.data.forEach(s => arr.push(s.wins));
  //         res.push({ name: playerNames[i], value: ((arr.slice(0, -1).map((v, i) => arr[i + 1] - v).reduce((a, b) => a + b, 0) / (arr.length - 1)) * 10).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) });
  //     }
  // })

  ngdata.forEach((d) => {
    let arr = [];
    d.data.forEach((s) => arr.push(s.wins));
    if (d.data.length)
      res.push({
        name: d.data[d.data.length - 1].name,
        value: parseInt(
          arr
            .slice(0, -1)
            .map((v, i) => arr[i + 1] - v)
            .reduce((a, b) => a + b, 0) /
            (arr.length - 1)
        ),
      });
  });

  // res.sort((a, b) => ~~b.value - ~~a.value);
  res.sort((a, b) => b.value - a.value);

  let comp = int.message.components[0].components.filter((v) =>
    v.customId.includes("guildWinsLB")
  );

  int.message.components[0].components[
    int.message.components[0].components.indexOf(comp[0])
  ].disabled = true;

  int.message.edit({ components: int.message.components }).catch(console.log);

  let na = playerNames.filter((x) => !res.map((y) => y.name).includes(x));

  return int.editReply({
    content: `Requested by ${int.user.tag}`,
    embeds: [
      new Discord.MessageEmbed()
        .setColor(
          !guild.rawTag?.startsWith("Â") ? client.color : guild.tagColor
        )
        .setAuthor(
          client.user.username,
          client.user.displayAvatarURL({ dynamic: true, size: 1024 })
        )
        .setTitle(`${guild.name} - Avg. Wins/Day LB`)
        .setURL(
          `https://ngmc.co/g/${encodeURIComponent(guild.name)}`
        )
        .setDescription(
          `${res
            .map(
              (r, i) =>
                `\`#${(i + 1).toString().length == 1 ? `0${i + 1}` : i + 1}\` ${
                  r.name
                } - **${r.value.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}**`
            )
            .join("\n")}\n${na
            .map((r, i) => `\`#${i + res.length + 1}\` ${r} - **N/A**`)
            .join("\n")}`
        )
        .setFooter(`ns!track gm ${guild.name} if you see N/A's`)
        .setTimestamp(),
    ],
  });
};
