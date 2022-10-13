const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ],
    allowedMentions: { repliedUser: false }
});
const mongoose = require('mongoose');

client.commands = new Discord.Collection();
client.cooldowns = new Map();
client.tempPrefix = {};
client.ngKey = process.env.NGKEY;
client.invite = 'https://top.gg/bot/863712579599597578';
client.slashCommands = {
    post: [],
    info: {}
};

['command_handler', 'event_handler', 'slash_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connected to the Database")
}).catch((err) => {
    console.log(err);
});

client.login(process.env.TOKEN)
