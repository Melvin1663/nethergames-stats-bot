module.exports = {
    name: 'winssince',
    description: 'Get a players wins since (time)',
    options: [
        {
            name: 'player',
            description: "The Players In Game Name (IGN)",
            type: 'STRING',
            required: false
        },
        {
            name: 'time',
            description: "The Date at which to count from",
            type: 'STRING',
            required: false,
            choices: [
                { name: 'Yesterday', value: '?yesterday' },
                { name: 'Last Week', value: '?lastweek' },
                { name: 'Last Month', value: '?lastmonth' }
            ]
        }
    ],
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let res = await require('../../../commands_src/nethergames/winssince')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}