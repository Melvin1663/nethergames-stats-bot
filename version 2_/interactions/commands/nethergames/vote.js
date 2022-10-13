module.exports = {
    name: 'vote',
    description: 'Gives you links for where to vote',
    run: async (Discord, client, int, args) => {
        if (!int.deffered && !int.replied) await int.deferReply().catch(console.log)
        let res = await require('../../../commands_src/nethergames/vote')(Discord, client, int, args)
        return int.editReply(res).catch(console.log)
    }
}