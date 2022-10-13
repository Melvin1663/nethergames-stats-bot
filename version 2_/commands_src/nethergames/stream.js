const get = require('node-fetch2')

module.exports = async (Discord, client, msg) => {
    let stream = await require('../../functions/ng/stream')();

    stream = await stream.json;

    let embed = new Discord.MessageEmbed()
        .setAuthor('Stream Status', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
        .setColor('#737373')
        .setTitle("NetherGames TV is currently offline")
        .setTimestamp()

    if (stream.streaming == false) return {
        embeds: [
            embed
                .setColor('RED')
                .setTitle('⚫ NetherGames TV is currently offline')
        ]
    }; else return {
        embeds: [
            embed
                .setColor('#FF0000')
                .setTitle('🔴 NetherGames TV is currently streaming')
        ]
    };
}