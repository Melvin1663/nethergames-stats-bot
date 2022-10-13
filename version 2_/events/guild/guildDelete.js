module.exports = (Discord, client, guild) => {
    client.channels.fetch('933004987158642729').then(async c => {
        let owner = await guild.fetchOwner();
        c.send(`🔻 Left guild \`${guild.name}\` by \`${owner?.user?.tag}\` with ${guild.memberCount.toLocaleString()} members`);
    }).catch(() => console.log('[X] Guild Delete message not sent.'))
}