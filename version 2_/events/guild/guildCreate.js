module.exports = (Discord, client, guild) => {
    client.channels.fetch('933004987158642729').then(async c => {
        let owner = await guild.fetchOwner();
        c.send(`<:up:895216801825300490> Joined guild \`${guild.name}\` by \`${owner?.user?.tag}\` with ${guild.memberCount.toLocaleString()} members`);
    }).catch(() => console.log('[X] Guild Create message not sent.'))
}