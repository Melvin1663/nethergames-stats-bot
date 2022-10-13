module.exports = {
    name: 'nextguildlevel',
    description: 'Calculate the next level of a guild',
    options: [
        {
            name: 'guild',
            description: "The Guilds name",
            type: 'STRING',
            required: false
        },
        {
            name: 'level',
            type: 'STRING',
            description: 'Guild Level Goal',
            required: false
        }
    ],
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log);
        if (/^[0-9]+$/.test(args[args.length - 1])) args[args.length - 1] = `?${args[args.length - 1]}`;
        let res = await require('../../../commands_src/nethergames/nextguildlevel')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}