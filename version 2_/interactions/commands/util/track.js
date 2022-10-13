module.exports = {
    name: 'track',
    description: 'Tracks Statistical History of a player or a guild',
    options: [
        {
            name: 'type',
            description: "The type you wanna track",
            type: 'STRING',
            required: true,
            choices: [
                { name: 'Player', value: 'player' },
                { name: 'Guild', value: 'guild' },
                { name: 'Guild Members', value: 'guildmember' }
            ]
        },
        {
            name: 'name',
            description: "The name",
            type: 'STRING',
            required: true
        }
    ],
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let res = await require('../../../commands_src/util/track')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}