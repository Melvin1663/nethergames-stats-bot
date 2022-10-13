require('dotenv').config();
const Discord = require('discord.js');
const canvas = require('canvas');
const mongoose = require('mongoose');
const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
    allowedMentions: { repliedUser: false }
});

client.commands = {};
client.version = "3.9.1"
client.codeName = 'PBR 1'
client.cooldowns = new Map()
client.leaderboards = {};
client.tempPrefix = {};
client.canvas = {
    backgrounds: {},
    skins: {},
    watermark: {}
}
client.interactions = {
    commands: {},
    context: {
        user: {},
        message: {}
    }
};
client.color = 'ff9100';
// client.color = 'EC9A35'; /* Old Orange */
// client.color = 'f542f2'; /* RIP Technoblade */
client.ngKey = process.env.NGKEY;
client.onlineIco = 'https://i.imgur.com/3enqrBX.png';
client.offlineIco = 'https://i.imgur.com/SwsFWgP.png';

['commands', 'event', 'interactions'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
});

require('./functions/init/canvas')(client, canvas);

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to the Database")
}).catch((err) => {
    console.log(err);
});

client.login(process.env.TOKEN)

module.exports = client;
