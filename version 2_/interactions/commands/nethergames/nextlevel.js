module.exports = {
    name: 'nextlevel',
    description: 'Calculate the next level of a player',
    options: [
        {
            name: 'player',
            description: "The Players In Game Name (IGN)",
            type: 'STRING',
            required: false
        },
        {
            name: 'level',
            type: 'STRING',
            description: 'Your level goal',
            required: false
        }
    ],
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        if (/^[0-9]+$/.test(args[args.length - 1])) args[args.length - 1] = `?${args[args.length - 1]}`;
        let res = await require('../../../commands_src/nethergames/nextlevel')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}