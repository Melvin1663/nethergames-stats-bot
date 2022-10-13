const linkSchema = require("../../schemas/link");

module.exports = async (Discord, client, msg, args) => {
  try {
    let tags = {
      0: "Default",
      25: "Gray",
      50: "Dark Aqua",
      150: "Yellow",
      300: "Dark Green",
      500: "Pink",
      750: "Gold",
      default: 0,
      gray: 25,
      "dark aqua": 50,
      yellow: 150,
      "dark green": 300,
      pink: 500,
      gold: 750,
      display: [
        "default",
        "gray",
        "dark aqua",
        "yellow",
        "dark green",
        "pink",
        "gold",
      ],
      index: [0, 25, 50, 150, 300, 500, 750],
    };

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
          "nextguildtag"
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

    let nextTag;
    let guildCTag;

    if (guild.level < 25) guildCTag = "default";
    else if (guild.level < 50) guildCTag = "gray";
    else if (guild.level < 150) guildCTag = "dark aqua";
    else if (guild.level < 300) guildCTag = "yellow";
    else if (guild.level < 500) guildCTag = "dark green";
    else if (guild.level < 750) guildCTag = "pink";
    if (guild.level > 749) return `There are no more tags after Gold Tag`;

    if (
      !args[args.length - 1].includes("?") &&
      !tags[args[args.length - 1].toLowerCase()]
    )
      nextTag = tags[tags.display[tags.index.indexOf(tags[guildCTag]) + 1]];
    else {
      nextTag = tags[args[args.length - 1].replace("?", "").toLowerCase()];

      if (!nextTag)
        return `The Tag "${args[args.length - 1].replace(
          "?",
          ""
        )}" doesn't exist?`;
    }

    const lvlToXp = require("../../functions/lvlToXp");

    let xpLeft = lvlToXp(nextTag) - guild.xp;
    let barTotal = require("../../functions/progressBar")(
      "<:pe1:988780719625076756>",
      "<:pe2:988780721646731304>",
      "<:pe3:988780723248988201>",
      "<:bf1:988780688515940352>",
      "<:bf2:988780690294321184>",
      "<:bf3:988780692429234197>",
      (guild.xp / (guild.xp + xpLeft)) * 15,
      15
    );
    let bar = require("../../functions/progressBar")(
      "<:pe1:988780719625076756>",
      "<:pe2:988780721646731304>",
      "<:pe3:988780723248988201>",
      "<:bf1:988780688515940352>",
      "<:bf2:988780690294321184>",
      "<:bf3:988780692429234197>",
      ((guild.level - tags[guildCTag || "default"]) /
        (nextTag - tags[guildCTag || "default"])) *
      15,
      15
    );

    return {
      embeds: [
        new Discord.MessageEmbed()
          .setAuthor(
            `${guild.name}`,
            `https://api.ngmc.co/v1/players/${encodeURIComponent(
              guild.leader
            )}/avatar`,
            `https://ngmc.co/g/${encodeURIComponent(guild.name)}`
          )
          .setColor(guild.tagColor || client.color)
          .setDescription(
            `**${xpLeft.toLocaleString()}** more XP till Level ${nextTag.toLocaleString()} (${tags[nextTag]
            })\n\n**${require("../../functions/upper")(guildCTag, 1) || "Default"
            } -> ${tags[nextTag]} [(${~~(
              ((guild.level - tags[guildCTag || "default"]) /
                (nextTag - tags[guildCTag || "default"])) *
              100
            )}%)](https://ngmc.co/g/${guild.name.replace(
              / +/g,
              "%20"
            )})**\n${bar}\n**0 -> ${nextTag.toLocaleString()} [(${~~(
              (guild.xp / (guild.xp + xpLeft)) *
              100
            )}%)](https://ngmc.co/g/${guild.name.replace(
              / +/g,
              "%20"
            )})**\n${barTotal}`
          )
          .setTimestamp()
          .setFooter(
            `(${guild.level.toLocaleString()}) ${require("../../functions/upper")(guildCTag, 1) || "Default"
            } Tag`
          ),
      ],
    };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
