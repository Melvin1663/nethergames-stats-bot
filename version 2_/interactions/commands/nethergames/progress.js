module.exports = {
    name: 'progress',
    description: 'Get a players stats change by their username or XUID.',
    options: [
        {
            name: 'player',
            description: "The Players In Game Name (IGN)",
            type: 'STRING',
            required: false
        },
        {
            name: 'days',
            type: 'INTEGER',
            description: 'How many days to go calculate from',
            required: false
        }
    ],
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log);
        if (/^[0-9]+$/.test(args[args.length - 1])) args[args.length - 1] = `?${args[args.length - 1]}`;
        let res = await require('../../../commands_src/nethergames/progress')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}