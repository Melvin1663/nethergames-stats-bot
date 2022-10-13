const get = require("node-fetch2");
const linkSchema = require("../../schemas/link");

module.exports = async (Discord, client, msg, args) => {
  try {
    if (!args.length || args[0].startsWith("?")) {
      const links = await linkSchema.findOne({ userID: msg.member.user.id });
      if (!links) return "<:warningo:1001073452385583215> No faction specified";
      if (!links.data.faction) return "<:warningo:1001073452385583215> No faction specified";
      args.unshift(links.data.faction);
    }

    let showStatus = false;
    let withLocations = false;

    if (args[args.length - 1].startsWith("?true")) showStatus = true;
    if (showStatus && args[args.length - 1].startsWith("?truew"))
      withLocations = true;

    let faction = await require("../../functions/ng/faction")(
      require("../../functions/deQ")(args.join(" ")),
      showStatus
    );
    if (faction.code != 0) {
      if (faction.code == 404) {
        let s = await require("../../functions/genButtons")(
          5,
          require("../../functions/deQ")(args.join(" ")),
          "faction",
          "faction"
        );
        if (s.code == 0) {
          let resp = {
            content: `<:erroro:1001073206389649408> Faction not found: ${require("../../functions/deQ")(
              args.join(" ")
            )}`,
          };
          if (s.json[0].components.length > 0) {
            resp.content += "\n<:helpo:1001073741897408563> Do you mean:";
            resp.components = s.json;
          }
          return resp;
        }
        return faction.msg;
      } else return faction.msg;
    }

    faction = faction.json;

    if (faction.message)
      return `<:erroro:1001073206389649408> An Error Occured, try again later\n${faction.message}`;

    let online = 0;
    let players = {};

    let members = [];
    let officers = [];
    let allies = [];
    let onlineMembers = 0;
    let onlineOfficers = 0;
    let onlineLeader = 0;

    if (showStatus) {
      let playerArrs = faction.members.concat(faction.officers);
      if (faction.leader) playerArrs.push(faction.leader);

      playerArrs.forEach((p) => {
        players[p.name] = p.online ? "🟢" : "🔴";
      });

      for (let player in players) {
        if (players[player] == "🟢") online++;
      }

      faction.members.forEach((member) => {
        members.push(
          `${!players[member.name] ? "🔴" : players[member.name]} [${
            member.name
          }](https://ngmc.co/p/${encodeURIComponent(
            member.name
          )})${
            withLocations && players[member.name] == "🟢"
              ? ` (${member.lastServerParsed.pretty})`
              : ""
          }`
        );
      });
      faction.officers.forEach((officer) => {
        officers.push(
          `${!players[officer.name] ? "🔴" : players[officer.name]} [${
            officer.name
          }](https://ngmc.co/p/${encodeURIComponent(
            officer.name
          )})${
            withLocations && players[officer.name] == "🟢"
              ? ` (${officer.lastServerParsed.pretty})`
              : ""
          }`
        );
      });
      faction.allies.forEach((ally) => {
        allies.push(
          `⚫ [${ally}](https://ngmc.co/f/${encodeURIComponent(
            ally
          )})`
        );
      });
      members.forEach((i) => {
        if (i.includes("🟢")) onlineMembers++;
      });
      officers.forEach((i) => {
        if (i.includes("🟢")) onlineOfficers++;
      });
      if (players[faction.leader.name].includes("🟢")) onlineLeader++;
    } else {
      faction.members.forEach((member) => {
        members.push(
          `[${member}](https://ngmc.co/p/${encodeURIComponent(
            member
          )})`
        );
      });
      faction.officers.forEach((officer) => {
        officers.push(
          `[${officer}](https://ngmc.co/p/${encodeURIComponent(
            officer
          )})`
        );
      });
      faction.allies.forEach((ally) => {
        allies.push(
          `[${ally}](https://ngmc.co/f/${encodeURIComponent(
            ally
          )})`
        );
      });
    }

    if (!members.length) members.push("N/A");
    if (!officers.length) officers.push("N/A");
    if (!allies.length) allies.push("N/A");

    let comp = [
      new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId(
            JSON.stringify({
              cmd: "faction",
              do: "showLeader",
              data: showStatus ? faction.leader.name : faction.leader,
            })
          )
          .setLabel(showStatus ? faction.leader.name : faction.leader)
          .setStyle("PRIMARY")
      ),
    ];

    let factionEmbed = new Discord.MessageEmbed()
      .setColor(client.color)
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setTitle(faction.name)
      .setURL(
        `https://ngmc.co/f/${encodeURIComponent(faction.name)}`
      )
      .setThumbnail(
        `https://api.ngmc.co/v1/players/${encodeURIComponent(
          faction.leader
        )}/avatar`
      )
      .addFields(
        {
          name: "<:hashtago:1001039371740381184> Player Count",
          value:
            (
              faction.members.length +
              1 +
              faction.officers.length
            )?.toLocaleString() || "N/A",
          inline: true,
        },
        {
          name: "<:123o:1001044219365965854> ID",
          value: (faction.id || 0).toLocaleString() || "N/A",
          inline: true,
        },
        {
          name: "<:upupo:1001070386210951258> Strength",
          value: (faction.strength || 0).toLocaleString() || "N/A",
          inline: true,
        }
      )
      .setTimestamp();

    if (showStatus) {
      factionEmbed
        .setDescription(
          `**<:persono:1001059630539083776> Leader [${onlineLeader}/1]**\n${players[faction.leader.name]} [${
            faction.leader.name
          }](https://ngmc.co/p/${encodeURIComponent(
            faction.leader.name
          )})${
            withLocations && players[faction.leader.name] == "🟢"
              ? ` (${faction.leader.lastServerParsed.pretty})`
              : ""
          }\n` +
            `**<:handshakeo:1001072511007604837> All${
              allies.length == 1 ? (allies[0] == "N/A" ? "y" : "y") : "ies"
            } [${
              allies.length == 1
                ? allies[0] == "N/A"
                  ? "0"
                  : allies.length
                : allies.length
            }]**\n${allies.join("\n")}\n` +
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
            faction.members.length +
            1 +
            faction.officers.length
          ).toLocaleString()}`
        );
    } else {
      factionEmbed.setDescription(
        `**<:persono:1001059630539083776> Leader [1]**\n[${
          faction.leader
        }](https://ngmc.co/p/${encodeURIComponent(
          faction.leader
        )})\n` +
          `**<:handshakeo:1001072511007604837> All${
            allies.length == 1 ? (allies[0] == "N/A" ? "y" : "y") : "ies"
          } [${
            allies.length == 1
              ? allies[0] == "N/A"
                ? "0"
                : allies.length
              : allies.length
          }]**\n${allies.join("\n")}\n` +
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
      );
    }
    return { embeds: [factionEmbed], components: comp };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
