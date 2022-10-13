const linkSchema = require("../../schemas/link");
const ngblade = require("../../schemas/ngblade");

module.exports = async (Discord, client, msg, args) => {
  try {
    if (!args.length || args[0].startsWith("?")) {
      const links = await linkSchema.findOne({ userID: msg.member.user.id });
      if (!links) return "<:warningo:1001073452385583215> No guild specified";
      if (!links.data.guild) return "<:warningo:1001073452385583215> No guild specified";
      args.unshift(links.data.guild);
    }

    let showStatus = false;
    let withLocations = false;

    if (args[args.length - 1].startsWith("?true")) showStatus = true;
    if (showStatus && args[args.length - 1].startsWith("?truew"))
      withLocations = true;

    let guild = await require("../../functions/ng/guild")(
      require("../../functions/deQ")(args.join(" ")),
      showStatus
    );
    if (guild.code != 0) {
      if (guild.code == 404) {
        let s = await require("../../functions/genButtons")(
          5,
          require("../../functions/deQ")(args.join(" ")),
          "guild",
          "guild"
        );
        if (s.code == 0) {
          let resp = {
            content: `<:erroro:1001073206389649408> Guild not found: ${require("../../functions/deQ")(
              args.join(" ")
            )}`,
          };
          if (s.json[0].components.length > 0) {
            resp.content += "\n<:helpo:1001073741897408563> Do you mean:";
            resp.components = s.json;
          }
          return resp;
        }
        return guild.msg;
      } else return guild.msg;
    }

    guild = guild.json;

    if (guild.message)
      return `<:erroro:1001073206389649408> An Error Occured, try again later\n${guild.message}`;

    let isInNGBlade = false;

    let ngdata = await ngblade.findOne({ id: guild.id });
    if (ngdata && ngdata.data.length) isInNGBlade = true;

    let online = 0;
    let players = {};

    const colorCodes = {
      "§4": "<:darkred:872103440128565299>",
      "§c": "<:red:872103439839154207>",
      "§6": "<:gold:872103440099196979>",
      "§e": "<:yellow:872103439985963039>",
      "§2": "<:darkgreen:872103440426340384>",
      "§a": "<:green:872103439780413531>",
      "§b": "<:aqua:872103439981756436>",
      "§3": "<:darkaqua:872103439914651709>",
      "§1": "<:darkblue:872103440023687198>",
      "§9": "<:blue:872103439952392222>",
      "§d": "<:lightpurple:872103440329871390>",
      "§5": "<:darkpurple:872103439918858240>",
      "§f": "<:white:872103439914663996>",
      "§7": "<:grey:872103439763656745>",
      "§8": "<:darkgray:872103439809773679>",
      "§0": "<:black:872103439793029191>",
    };

    let members = [];
    let officers = [];
    let onlineMembers = 0;
    let onlineOfficers = 0;
    let onlineLeader = 0;
    let comps = [
      new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId(
            JSON.stringify({
              cmd: "guild",
              do: "showLeader",
              data: showStatus ? guild.leader.name : guild.leader,
            })
          )
          .setLabel((showStatus ? guild.leader.name : guild.leader) || 'js.guildException.nullifiedVoided.bool')
          .setStyle("PRIMARY"),
        new Discord.MessageButton()
          .setCustomId(
            JSON.stringify({
              cmd: "guild",
              do: "selectGraph",
              data: ["guild", guild.name],
            })
          )
          .setLabel("Graphs")
          .setStyle("DANGER")
          .setDisabled(!isInNGBlade),
        new Discord.MessageButton()
          .setCustomId(
            JSON.stringify({
              cmd: "guild",
              do: "guildWinsSLWLB",
              data: guild.name,
            })
          )
          .setLabel("Wins SLW")
          .setStyle("PRIMARY")
          //.setDisabled(!isInNGBlade)
      ),
    ];

    if (showStatus) {
      let playerArrs = guild.members?.concat(guild.officers);
      if (guild.leader) playerArrs.push(guild.leader);

      playerArrs.forEach((p) => {
        players[p.name] = p.online ? "🟢" : "🔴";
      });

      for (let player in players) {
        if (players[player] == "🟢") online++;
      }

      guild.members.forEach((member) => {
        members.push(
          `${!players[member.name] ? "🔴" : players[member.name]} ${
            withLocations
              ? `\`${member.name}\``
              : `[${
                  member.name
                }](https://ngmc.co/p/${encodeURIComponent(
                  member.name
                )})`
          }${
            withLocations
              ? withLocations && players[member.name] == "🟢"
                ? ` **(${member.lastServerParsed.pretty})**`
                : ` (${require("../../functions/timeShorter")(
                    member.lastSeen.replace("about ", "")
                  )} ago at ${member.lastServerParsed.pretty})`
              : ""
          }`
        );
      });
      guild.officers.forEach((officer) => {
        officers.push(
          `${!players[officer.name] ? "🔴" : players[officer.name]} ${
            withLocations
              ? `\`${officer.name}\``
              : `[${
                  officer.name
                }](https://ngmc.co/p/${encodeURIComponent(
                  officer.name
                )})`
          }${
            withLocations
              ? withLocations && players[officer.name] == "🟢"
                ? ` **(${officer.lastServerParsed.pretty})**`
                : ` (${require("../../functions/timeShorter")(
                    officer.lastSeen.replace("about ", "")
                  )} ago at ${officer.lastServerParsed.pretty})`
              : ""
          }`
        );
      });
      members.forEach((i) => {
        if (i?.includes("🟢")) onlineMembers++;
      });
      officers.forEach((i) => {
        if (i?.includes("🟢")) onlineOfficers++;
      });
      if (players[guild.leader.name]?.includes("🟢")) onlineLeader++;
    } else {
      guild.members.forEach((member) => {
        members.push(
          `[${member}](https://ngmc.co/p/${encodeURIComponent(
            member
          )})`
        );
      });
      guild.officers.forEach((officer) => {
        officers.push(
          `[${officer}](https://ngmc.co/p/${encodeURIComponent(
            officer
          )})`
        );
      });
    }

    if (!members.length) members.push("N/A");
    if (!officers.length) officers.push("N/A");

    let datas = {};
    for (i = Date.now() - 864000000; i < Date.now(); i += 86400000) {
      let ctime = new Date(i).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
      datas[ctime] = ngdata?.data?.find((v) => v.date == ctime)
        ? ngdata.data.find((v) => v.date == ctime).xp
        : 0;
    }

    let xpData = require("../../functions/interpolate")(
      Object.values(datas).map((v) => (v == 0 ? null : v))
    );

    let guildEmbed = new Discord.MessageEmbed()
      .setColor(!guild.rawTag?.startsWith("Â") ? client.color : guild.tagColor)
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setTitle(`(${guild.id}) ${guild.name}`)
      .setURL(
        `https://ngmc.co/g/${encodeURIComponent(guild.name)}`
      )
      .setThumbnail(
        `https://api.ngmc.co/v1/players/${encodeURIComponent(
          guild.leader
        )}/avatar`
      )
      .addFields(
        {
          name: "<:hashtago:1001039371740381184> Level",
          value:
            require("../../functions/xpToLvl")(guild.xp || 0)?.toLocaleString(
              "en-US",
              { minimumFractionDigits: 2 }
            ) || "N/A",
          inline: true,
        },
        { name: "<:mailo:1001066434006364230> MOTD", value: guild.motd || "N/A", inline: true },
        {
          name: "<:tago:1001066431955341404> Guild Tag",
          value:
            `${
              !guild.rawTag?.startsWith("Â")
                ? ""
                : colorCodes[
                    guild.rawTag?.slice(
                      1,
                      guild.rawTag?.length - guild.tag?.length
                    )
                  ]
            }${guild.tag || "N/A"}` || "N/A",
          inline: true,
        },
        {
          name: "<:coloro:1001066429203873843> Tag Color",
          value:
            `(${
              !guild.rawTag?.startsWith("Â")
                ? "??"
                : guild.rawTag?.slice(
                    1,
                    guild.rawTag?.length - guild.tag?.length
                  )
            }) ${guild.tagColor || "N/A"}` || "N/A",
          inline: true,
        },
        {
          name: "<:starso:1001066426976698478> Pos / Exp",
          value: `\`#${guild.position?.toLocaleString() || "??"}\` ${
            guild.xp?.toLocaleString() || "N/A"
          }`,
          inline: true,
        },
        {
          name: "<:grapho:1001066424074256384> Avg Exp/Day (L10D)",
          value: isInNGBlade
            ? (
                xpData
                  .slice(0, -1)
                  .map((v, i) => xpData[i + 1] - v)
                  .reduce((a, b) => a + b, 0) /
                (xpData.length - 1)
              ).toLocaleString()
            : "N/A",
          inline: true,
        }
      )
      .setTimestamp();

    if (showStatus) {
      guildEmbed
        .setDescription(
          `**<:persono:1001059630539083776> Leader [${onlineLeader}/1]**\n${players[guild.leader.name]} ${
            guild.leader
              ? withLocations
                ? `\`${guild.leader.name}\`${
                    withLocations
                      ? withLocations && players[guild.leader.name] == "🟢"
                        ? ` (${guild.leader.lastServerParsed.pretty})`
                        : ` (${require("../../functions/timeShorter")(
                            guild.leader.lastSeen.replace("about ", "")
                          )} ago at ${guild.leader.lastServerParsed.pretty})`
                      : ""
                  }`
                : `[${
                    guild.leader.name
                  }](https://ngmc.co/p/${encodeURIComponent(
                    guild.leader.name
                  )})`
              : "N/A"
          }\n` +
            `**<:groupo:1001059624574795896> Officer${
              officers.length == 1 ? (officers[0] == "N/A" ? "" : "") : "s"
            } [${onlineOfficers}/${
              officers.length == 1
                ? officers[0] == "N/A"
                  ? "0"
                  : officers.length
                : officers.length
            }]**\n${officers.join("\n")}\n` +
            `**<:groupso:1001059626797772891> Member${
              members.length == 1 ? (members[0] == "N/A" ? "" : "") : "s"
            } [${onlineMembers}/${
              members.length == 1
                ? members[0] == "N/A"
                  ? "0"
                  : members.length
                : members.length
            }]**\n${members.join("\n")}`
        )
        .setFooter(
          `Online Players: ${online}/${(
            guild.members.length +
            1 +
            guild.officers.length
          )?.toLocaleString()}`
        );
    } else {
      guildEmbed
        .setDescription(
          `**<:persono:1001059630539083776> Leader [1]**\n${
            guild.leader
              ? `[${
                  guild.leader
                }](https://ngmc.co/p/${encodeURIComponent(
                  guild.leader
                )})`
              : "N/A"
          }\n` +
            `**<:groupo:1001059624574795896> Officer${
              officers.length == 1 ? (officers[0] == "N/A" ? "" : "") : "s"
            } [${
              officers.length == 1
                ? officers[0] == "N/A"
                  ? "0"
                  : officers.length
                : officers.length
            }]**\n${officers.join("\n")}\n` +
            `**<:groupso:1001059626797772891> Member${
              members.length == 1 ? (members[0] == "N/A" ? "" : "") : "s"
            } [${
              members.length == 1
                ? members[0] == "N/A"
                  ? "0"
                  : members.length
                : members.length
            }]**\n${members.join("\n")}`
        )
        .setFooter(
          `Total Players: ${
            (
              guild.members.length +
              1 +
              guild.officers.length
            )?.toLocaleString() || "N/A"
          }`
        );
    }
    return { embeds: [guildEmbed], components: comps };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
