const get = require("node-fetch2");
const linkSchema = require("../../schemas/link");

module.exports = async (Discord, client, msg, args) => {
  try {
    let tiers = {
      0: "Default",
      5000: "Silver",
      10000: "Gold",
      20000: "Guardian",
      40000: "Eagle",
      50000: "Elite",
      default: 0,
      silver: 5000,
      gold: 10000,
      guardian: 20000,
      eagle: 40000,
      elite: 50000,
      display: ["default", "silver", "gold", "guardian", "eagle", "elite"],
      index: [0, 5000, 10000, 20000, 40000, 50000],
    };

    if (!args.length || args[0].includes("?")) {
      const links = await linkSchema.findOne({ userID: msg.member.user.id });
      if (!links) return "<:warningo:1001073452385583215> No player specified";
      if (!links.data.player) return "<:warningo:1001073452385583215> No player specified";
      args.unshift(links.data.player);
    }

    let player = await require("../../functions/ng/player")(require("../../functions/deQ")(args.join(" ")), { expand: false, withFactionData: false, withGuildData: false, withOnline: false, withPunishments: false, withSkinData: false, withStats: false, withVoteStatus: false });
    if (player.code != 0) {
      if (player.code == 404) {
        let s = await require("../../functions/genButtons")(
          5,
          require("../../functions/deQ")(args.join(" ")),
          "player",
          "nexttier"
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

    let nextTier;

    if ((player.tier || "Default").toLowerCase() == "elite")
      return `There are no more Tiers after Elite`;

    if (!args[args.length - 1].includes("?") && !tiers[args[args.length - 1]])
      nextTier =
        tiers[
        tiers.display[
        tiers.index.indexOf(
          tiers[(player.tier || "Default").toLowerCase()]
        ) + 1
        ]
        ];
    else {
      nextTier = tiers[args[args.length - 1].replace("?", "")];

      if (!nextTier)
        return `The Tier "${args[args.length - 1].replace(
          "?",
          ""
        )}" doesn't exist?`;
    }

    let credsLeft = nextTier - player.credits;
    let barTotal = require("../../functions/progressBar")(
      "<:pe1:988780719625076756>",
      "<:pe2:988780721646731304>",
      "<:pe3:988780723248988201>",
      "<:bf1:988780688515940352>",
      "<:bf2:988780690294321184>",
      "<:bf3:988780692429234197>",
      (player.credits / nextTier) * 15,
      15
    );
    let bar = require("../../functions/progressBar")(
      "<:pe1:988780719625076756>",
      "<:pe2:988780721646731304>",
      "<:pe3:988780723248988201>",
      "<:bf1:988780688515940352>",
      "<:bf2:988780690294321184>",
      "<:bf3:988780692429234197>",
      ((player.credits - tiers[player.tier?.toLowerCase() || "default"]) /
        (player.credits -
          tiers[player.tier?.toLowerCase() || "default"] +
          credsLeft)) *
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
            `**${credsLeft.toLocaleString()}** more Credits till Tier ${tiers[nextTier]
            }\n\n**${player.tier || "Default"} -> ${tiers[nextTier]} [(${~~(
              ((player.credits -
                tiers[player.tier?.toLowerCase() || "default"]) /
                (nextTier - tiers[player.tier?.toLowerCase() || "default"])) *
              100
            )}%)](https://ngmc.co/p/${player.name.replace(
              / +/g,
              "%20"
            )})**\n${bar}\n**Default -> ${tiers[nextTier]} [(${~~(
              (player.credits / nextTier) *
              100
            )}%)](https://ngmc.co/p/${player.name.replace(
              " ",
              "%20"
            )})**\n${barTotal}`
          )
          .setTimestamp()
          .setFooter(
            `(${player.credits.toLocaleString()}) ${player.tier || "Default"
            } Tier`
          ),
      ],
    };
  } catch (e) {
    console.log(e);
    return `<:erroro:1001073206389649408> Oops... An error occured`;
  }
};
