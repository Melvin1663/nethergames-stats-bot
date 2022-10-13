const prefixSchema = require('../../models/prefix');
const mongoose = require('mongoose')

module.exports = {
    name: 'setprefix',
    aliases: ['prefix'],
    description: "Sets a new prefix for the Bot.",
    usage: 'ns!setprefix [new prefix]',
    example: ['ns!setprefix ng!', 'ns!prefix', 'ns!prefix !'],
    cooldown: 5,
    async execute(client, message, cmd, args, Discord) {
        message.g
        const settings = await prefixSchema.findOne({ guildID: message.guild.id });

        if (!args[0]) {
            delete client.cooldowns.get('setprefix')[message.author.id]
            return message.reply(`The current Prefix for this server is \`${client.tempPrefix[message.guild.id]}\``);
        }
        if (args[0].length > 5) {
            delete client.cooldowns.get('setprefix')[message.author.id]
            return message.reply("Error: New Prefix must not Exceed 5 Characters.");
        }
        if (args.length > 1) {
            delete client.cooldowns.get('setprefix')[message.author.id]
            return message.reply("Error: New Prefix must not contain any spaces.")
        }
        if (!settings) {
            const newPrefix = new prefixSchema({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                prefix: args[0]
              })
            newPrefix.save().catch(e => {
                delete client.cooldowns.get('setprefix')[message.author.id]
                message.reply('Error: Failed to Save new Prefix.')
                console.log(e)
            })
        } else {
            await settings.updateOne({
                prefix: args[0]
            });
        }
        client.tempPrefix[message.guild.id] = args[0]
        return message.reply(`New Prefix! \`${args[0]}\``);
    }
}