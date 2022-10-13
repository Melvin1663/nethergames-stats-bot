module.exports = {
  name: "leaderboard",
  description: "List global leaderboards for the specified type.",
  options: [
    {
      name: "type",
      description: "The type of leaderboard",
      type: "STRING",
      required: true,
      choices: [
        { name: "Credits", value: "credits" },
        { name: "Factions", value: "factions" },
        { name: "Guild XP", value: "guilds" },
        { name: "Guild Level", value: "guildslvl" },
        { name: "K/DR", value: "kdr" },
        { name: "W/LR", value: "wlr" },
        { name: "Kills", value: "kills" },
        { name: "Parkour", value: "parkour" },
        { name: "Voters", value: "voters" },
        { name: "Wins", value: "wins" },
        { name: "XP", value: "xp" },
        { name: "Levels", value: "lvl" },
      ],
    },
  ],
  run: async (Discord, client, int, args) => {
    if (!int.deffered && !int.replied)
      await int.deferReply().catch(console.log);
    let res = await require("../../../commands_src/nethergames/lb")(
      Discord,
      client,
      int,
      args
    );
    return int.editReply(res).catch(console.log);
  },
};
