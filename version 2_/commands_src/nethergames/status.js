module.exports = async (Discord, client, msg, args) => {
    try {
        let status = await require('../../functions/ng/status')();

        status = await status.json;

        let embed = new Discord.MessageEmbed()
            .setAuthor('NetherGames Status', 'https://pbs.twimg.com/profile_images/1263460827719442439/Vn9-NXhE.jpg')
            .setTitle(status.title)
            .setDescription(status.message)
            .setColor(status.color)
            .setURL(status.url)
            .setTimestamp()
            .setFooter(status.status)

        return { embeds: [embed] }
    } catch (e) {
        console.log(e);
        return `<:erroro:1001073206389649408> Oops... An error occured`;
    }
}