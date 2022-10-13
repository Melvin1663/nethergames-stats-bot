const get = require("node-fetch2");
const linkSchema = require("../../schemas/link");

module.exports = async (Discord, client, msg, args) => {
  try {
    if (!args.length || args[0].includes("?")) {
      const links = await linkSchema.findOne({ userID: msg.member.user.id });
      if (!links) return "<:warningo:1001073452385583215> No guild specified";
      if (!links.data.guild) return "<:warningo:1001073452385583215> No guild specified";
      args.unshift(links.data.guild);
    }

    let guild = await require("../../functions/ng/guild")(
      require("../../functions/deQ")(args.join(" "))
    );
    if (guild.code != 0) {
      if (guild.code == 404) {
        let s = await require("../../functions/genButtons")(
          5,
          require("../../functions/deQ")(args.join(" ")),
          "guild",
          "nextguildlevel"
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

    let nextLvl;

    if (!args[args.length - 1].includes("?")) nextLvl = guild.level + 1;
    else nextLvl = +args[args.length - 1].replace("?", "");

    const lvlToXp = require("../../functions/lvlToXp");
    const xpToLvl = require("../../functions/xpToLvl");

    let xpLeft = lvlToXp(nextLvl) - guild.xp;
    let barTotal = require("../../functions/progressBar")(
      "<:pe1:988780719625076756>",
      "<:pe2:988780721646731304>",
      "<:pe3:988780723248988201>",
      "<:bf1:988780688515940352>",
      "<:bf2:988780690294321184>",
      "<:bf3:988780692429234197>",
      ((guild.xp - lvlToXp(~~(guild.level / 10) * 10)) /
        (lvlToXp(~~((guild.level + 10) / 10) * 10) -
          lvlToXp(~~(guild.level / 10) * 10))) *
        15,
      15
    );
    let bar = require("../../functions/progressBar")(
      "<:pe1:988780719625076756>",
      "<:pe2:988780721646731304>",
      "<:pe3:988780723248988201>",
      "<:bf1:988780688515940352>",
      "<:bf2:988780690294321184>",
      "<:bf3:988780692429234197>",
      ((guild.xp - lvlToXp(guild.level)) /
        (guild.xp - lvlToXp(guild.level) + xpLeft)) *
        15,
      15
    );

    return {
      embeds: [
        new Discord.MessageEmbed()
          .setAuthor(
            guild.name,
            `https://api.ngmc.co/v1/players/${encodeURIComponent(
              guild.leader
            )}/avatar`,
            `https://ngmc.co/g/${encodeURIComponent(guild.name)}`
          )
          .setColor(guild.tagColor || client.color)
          .setDescription(
            `**${xpLeft.toLocaleString()}** more XP till Level ${nextLvl.toLocaleString()}\n\n**${guild.level.toLocaleString()} -> ${nextLvl.toLocaleString()} [(${~~(
              ((xpToLvl(guild.xp) - guild.level) / (nextLvl - guild.level)) *
              100
            )}%)](https://ngmc.co/g/${guild.name.replace(
              / +/g,
              "%20"
            )})**\n${bar}\n**${(
              ~~(guild.level / 10) * 10
            ).toLocaleString()} -> ${(
              ~~(guild.level / 10) * 10 +
              10
            ).toLocaleString()} [(${~~(
              ((guild.xp - lvlToXp(~~(guild.level / 10) * 10)) /
                (lvlToXp(~~((guild.level + 10) / 10) * 10) -
                  lvlToXp(~~(guild.level / 10) * 10))) *
              100
            )}%)](https://ngmc.co/g/${guild.name.replace(
              / +/g,
              "%20"
            )})**\n${barTotal}`
          )
          .setTimestamp()
          .setFooter(`Level ${guild.level}`),
      ],
    };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
