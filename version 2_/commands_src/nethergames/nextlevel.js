const get = require("node-fetch2");
const linkSchema = require("../../schemas/link");

module.exports = async (Discord, client, msg, args) => {
  try {
    if (!args.length || args[0].includes("?")) {
      const links = await linkSchema.findOne({ userID: msg.member.user.id });
      if (!links) return "<:warningo:1001073452385583215> No player specified";
      if (!links.data.player) return "<:warningo:1001073452385583215> No player specified";
      args.unshift(links.data.player);
    }

    let player = await require("../../functions/ng/player")(require("../../functions/deQ")(args.join(" ")),{ expand: false, withFactionData: false, withGuildData: false, withOnline: false, withPunishments: false, withSkinData: false, withStats: false, withVoteStatus: false });
    if (player.code != 0) {
      if (player.code == 404) {
        let s = await require("../../functions/genButtons")(
          5,
          require("../../functions/deQ")(args.join(" ")),
          "player",
          "nextlevel"
        );
        if (s.code == 0) {
          let resp = {
            content: `Player not found: ${require("../../functions/deQ")(
              args.join(" ")
            )}`,
          };
          if (s.json[0].components.length > 0) {
            resp.content += "\n<:helpo:1001073741897408563> Do you mean:";
            resp.components = s.json;
          }
          return resp;
        }
        return player.msg;
      } else return player.msg;
    }

    player = player.json;

    if (player.message)
      return `<:erroro:1001073206389649408> An Error Occured, try again later\n${player.message}`;

    let nextLvl;

    if (!args[args.length - 1].includes("?")) nextLvl = player.level + 1;
    else nextLvl = +args[args.length - 1].replace("?", "");

    const lvlToXp = require("../../functions/lvlToXp");

    let xpLeft = lvlToXp(nextLvl) - player.xp;
    let barTotal = require("../../functions/progressBar")(
      "<:pe1:988780719625076756>",
      "<:pe2:988780721646731304>",
      "<:pe3:988780723248988201>",
      "<:bf1:988780688515940352>",
      "<:bf2:988780690294321184>",
      "<:bf3:988780692429234197>",
      ((player.xp - lvlToXp(~~(player.level / 10) * 10)) /
        (lvlToXp(~~((player.level + 10) / 10) * 10) -
          lvlToXp(~~(player.level / 10) * 10))) *
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
      ((player.xp - require("../../functions/lvlToXp")(player.level)) /
        (player.xp -
          require("../../functions/lvlToXp")(player.level) +
          xpLeft)) *
        15,
      15
    );

    return {
      embeds: [
        new Discord.MessageEmbed()
          .setAuthor(
            player.name,
            player.avatar,
            `https://ngmc.co/p/${encodeURIComponent(
              player.name
            )}`
          )
          .setColor(client.color)
          .setDescription(
            `**${xpLeft.toLocaleString()}** more XP till Level ${nextLvl.toLocaleString()}\n\n**${player.level.toLocaleString()} -> ${nextLvl.toLocaleString()} [(${~~(
              ((require("../../functions/xpToLvl")(player.xp) - player.level) /
                (nextLvl - player.level)) *
              100
            )}%)](https://ngmc.co/p/${player.name.replace(
              / +/g,
              "%20"
            )})**\n${bar}\n**${(
              ~~(player.level / 10) * 10
            ).toLocaleString()} -> ${(
              ~~(player.level / 10) * 10 +
              10
            ).toLocaleString()} [(${~~(
              ((player.xp - lvlToXp(~~(player.level / 10) * 10)) /
                (lvlToXp(~~((player.level + 10) / 10) * 10) -
                  lvlToXp(~~(player.level / 10) * 10))) *
              100
            )}%)](https://ngmc.co/p/${player.name.replace(
              / +/g,
              "%20"
            )})**\n${barTotal}`
          )
          .setTimestamp()
          .setFooter(`Level ${player.level.toLocaleString()}`),
      ],
    };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
