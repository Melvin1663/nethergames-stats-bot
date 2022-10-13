module.exports = (Discord, client, debug) => {
    if (debug.startsWith('[WS => Shard') && debug.includes('Heartbeat') && debug.includes('latency')) {
        client.channels.fetch('942262129812189254').then(async c => 
            c.send(debug).catch(console.log)
        ).catch(() => console.log('[X] Debug message not sent.'))
    }
}