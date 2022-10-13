const pb = require("../../../functions/progressBar");

module.exports = async (json, client, Discord, int) => {
  if (!json.data)
    return int.reply({ content: "Player Unspecified", ephemeral: true });

  if (!int.deffered && !int.replied) await int.deferReply().catch(console.log);
  let vipRanks = [];
  let player = await require("../../../functions/ng/player")(require("../../../functions/deQ")(json.data), { expand: false, withFactionData: false, withGuildData: false, withSkinData: false });
  if (player.code != 0) return player.msg;

  player = player.json;

  let tiers = {
    "Silver Tier": 5000,
    "Gold Tier": 10000,
    "Guardian Tier": 20000,
    "Eagle Tier": 40000,
    "Elite Tier": 50000,
  };

  player.ranks.forEach((e) =>
    [
      "Titan",
      "Legend",
      "Emerald",
      "Ultra"
    ].includes(e)
      ? vipRanks.push(e)
      : null
  );

  let score = {
    total: 0,
    kills: 0,
    wins: 0,
    level: 0,
    credits: 0,
  };

  score.total += player.kills / 1250;
  score.total += player.wins / 500;
  score.total += player.level / 25;
  score.total += player.credits / 750;

  score.kills += player.kills / 1250;
  score.wins += player.wins / 500;
  score.level += player.level / 25;
  score.credits += player.credits / 750;

  let winsData = [];
  for (let i in player.winsData) {
    if (player.winsData[i])
      winsData.push({ game: i, value: player.winsData[i] });
  }
  winsData.sort((a, b) => {
    const bandA = a.value;
    const bandB = b.value;

    let comparison = 0;
    if (bandA > bandB) comparison = 1;
    else if (bandA < bandB) comparison = -1;
    return comparison * -1;
  });

  let bestGameStats;
  if (winsData[0]?.game)
    bestGameStats =
      await require(`../../../util/game_stats/${winsData[0].game.toLowerCase()}`)(
        client,
        Discord,
        player,
        client.onlineIco,
        client.offlineIco
      ).catch(console.log);

  let weeklyStats = await require(`../../../commands_src/nethergames/progress`)(
    Discord,
    client,
    int,
    [player.name]
  );
  if (!weeklyStats) weeklyStats = "N/A";
  else if (typeof weeklyStats != "object")
    weeklyStats = `**Wins**: 0\n**Kills**: 0`;
  else if (weeklyStats.embeds?.length)
    weeklyStats = weeklyStats.embeds[0].description;
  else weeklyStats = "N/A";
  let advancedEmbed = new Discord.MessageEmbed()
    .setAuthor(
      client.user.username,
      client.user.displayAvatarURL({ dynamic: true, size: 1024 })
    )
    .setColor(client.color)
    .setTitle(player.name)
    .setURL(
      `https://ngmc.co/p/${encodeURIComponent(player.name)}`
    )
    .setThumbnail(
      `https://api.ngmc.co/v1/players/${encodeURIComponent(player.name)}/avatar`
    )
    .addFields(
      { name: "<:123o:1001044219365965854> Xbox User ID", value: player.xuid },
      { name: "<:datarangeo:1001044217432383538> Weekly Stats", value: weeklyStats, inline: true },
      { name: "<:displayo:1001044215276523631> Display Level", value: `**Formatted Level:** ${player.formattedLevel}\n**Level format:** ${player.levelFormat}\n**Level Colors:** ${player.levelColors.map(e => `[${e}](https://www.color-hex.com/color/${e.replace('#','')})`).join(', ')}\n**Tier Color:** ${player.tierColor ? `[${player.tierColor}](https://www.color-hex.com/color/${player.tierColor.replace('#','')})` : 'None'}`, inline: true },
      {
        name: `<:stacko:1001044213137412106> ${player.credits >= 0 && player.credits < 5000
          ? "Silver Tier"
          : player.credits > 5000 && player.credits < 10000
            ? "Gold Tier"
            : player.credits > 10000 && player.credits < 20000
              ? "Guardian Tier"
              : player.credits > 20000 && player.credits < 40000
                ? "Eagle Tier"
                : "Elite Tier"
          } (${player.credits?.toLocaleString() ?? 0}/${tiers[
            player.credits >= 0 && player.credits < 5000
              ? "Silver Tier"
              : player.credits > 5000 && player.credits < 10000
                ? "Gold Tier"
                : player.credits > 10000 && player.credits < 20000
                  ? "Guardian Tier"
                  : player.credits > 20000 && player.credits < 40000
                    ? "Eagle Tier"
                    : "Elite Tier"
          ].toLocaleString()})`,
        value: `${pb(
          "<:pe1:988780719625076756>",
          "<:pe2:988780721646731304>",
          "<:pe3:988780723248988201>",
          "<:bf1:988780688515940352>",
          "<:bf2:988780690294321184>",
          "<:bf3:988780692429234197>",
          ~~(
            (player.credits /
              tiers[
              player.credits >= 0 && player.credits < 5000
                ? "Silver Tier"
                : player.credits > 5000 && player.credits < 10000
                  ? "Gold Tier"
                  : player.credits > 10000 && player.credits < 20000
                    ? "Guardian Tier"
                    : player.credits > 20000 && player.credits < 40000
                      ? "Eagle Tier"
                      : "Elite Tier"
              ]) *
            10
          ),
          10
        )} **${~~(
          (player.credits /
            tiers[
            player.credits >= 0 && player.credits < 5000
              ? "Silver Tier"
              : player.credits > 5000 && player.credits < 10000
                ? "Gold Tier"
                : player.credits > 10000 && player.credits < 20000
                  ? "Guardian Tier"
                  : player.credits > 20000 && player.credits < 40000
                    ? "Eagle Tier"
                    : "Elite Tier"
            ]) *
          100
        )}%**`,
      }
    )
    .setFooter(
      `${player.online == true ? "Online" : "Offline"} - ${player.online == true ? "Playing on" : "Last Seen on"
      } ${player.lastServer}`,
      player.online == true ? client.onlineIco : client.offlineIco
    );

  if (bestGameStats)
    advancedEmbed.addField(
      `<:medalo:1001044210906058812> Mains: ${bestGameStats.game}`,
      bestGameStats.formattedData,
      true
    );

  advancedEmbed.addFields(
    {
      name: "<:hashtago:1001039371740381184> Estimated Player Score",
      value:
        `**Kills:** ${score.kills}\n` +
        `**Wins:** ${score.wins}\n` +
        `**Level:** ${score.level}\n` +
        `**Credits:** ${score.credits}\n` +
        `**Total:** ${score.total}`,
      inline: true,
    },
    {
      name: `<:flago:1001044208653701122> Flags: ${player.flags}`,
      value: `${require('../../../functions/playerflags')(player.flags).vip == true ? "<:online:816205802905665547>" : "<:dnd:816205800350416967>"} VIP${require('../../../functions/playerflags')(player.flags).vip ? " (" + vipRanks.join(", ") + ")" : ""} - If the player has a purchasable rank` +
        `\n${require('../../../functions/playerflags')(player.flags).hideSkin == true ? "<:online:816205802905665547>" : "<:dnd:816205800350416967>"} Hide Skin - Replaces \`/skin\` with a Steve skin` +
        `\n${require('../../../functions/playerflags')(player.flags).hideLastServer == true ? "<:online:816205802905665547>" : "<:dnd:816205800350416967>"} Hide Last Server - Replaces \`last_server\` with Lobby` +
        `\n${require('../../../functions/playerflags')(player.flags).quarantine == true ? "<:online:816205802905665547>" : "<:dnd:816205800350416967>"} Quarantined - Inability to make Purchases in the Store`
    }
  );

  int
    .editReply({
      content: `Requested by ${int.user.tag}`,
      embeds: [advancedEmbed],
    })
    .catch(console.log);

  let comp = int.message.components[1].components.filter((v) =>
    v.customId.includes("showAdvanced")
  );

  int.message.components[1].components[
    int.message.components[1].components.indexOf(comp[0])
  ].disabled = true;

  int.message.edit({ components: int.message.components }).catch(console.log);
};
