module.exports = {
    name: 'link',
    description: 'Link Players, Guilds, and Factions',
    options: [
        {
            name: 'add',
            description: 'Add a new link',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'type',
                    description: 'Which do you wanna link?',
                    type: 'STRING',
                    required: true,
                    choices: [
                        { name: 'Player', value: 'player' },
                        { name: 'Guild', value: 'guild' },
                        { name: 'Faction', value: 'faction' }
                    ]
                },
                {
                    name: 'input',
                    description: 'Input the name',
                    type: 'STRING',
                    required: true,
                }
            ]
        },
        {
            name: 'remove',
            description: 'Remove a link',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'type',
                    description: 'Which do you wanna unlink?',
                    type: 'STRING',
                    required: true,
                    choices: [
                        { name: 'Player', value: 'player' },
                        { name: 'Guild', value: 'guild' },
                        { name: 'Faction', value: 'faction' }
                    ]
                }
            ]
        },
        {
            name: 'reset',
            description: 'Remove all links',
            type: 'SUB_COMMAND'
        },
        {
            name: 'show',
            description: 'Show all of your links',
            type: 'SUB_COMMAND'
        }
    ],
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let rawArgs = [int.options._subcommand];
        args.forEach(v => {
            rawArgs.push(v)
        })
        let res = await require('../../../commands_src/util/link')(Discord, client, int, rawArgs)
        return int.editReply(res).catch(console.log)
    }
}