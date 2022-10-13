const prefixSchema = require('../../schemas/prefix');
const mongoose = require('mongoose')

module.exports = async (Discord, client, msg, args) => {
    if (!msg.member.permissions.has('MANAGE_GUILD')) return "You do not have the permission to manage my prefixes"
    const settings = await prefixSchema.findOne({ guildID: msg.guild.id });

    if (!args[0]) return `My prefix is \`${client.tempPrefix[msg.guild.id]}\``;
    if (args[0].length > 5) return "Prefix must not Exceed 5 Characters.";
    if (args.length > 1) return "Prefix must not contain any spaces.";
    if (!settings) {
        const newPrefix = new prefixSchema({
            _id: mongoose.Types.ObjectId(),
            guildID: msg.guild.id,
            prefix: args[0]
        })
        newPrefix.save().catch(e => {
            console.log(e)
            return {
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor('RED')
                        .setDescription('Something went wrong when saving the prefix, try again later')
                ]
            }
        })
    } else {
        await settings.updateOne({
            prefix: args[0]
        });
    }
    client.tempPrefix[msg.guild.id] = args[0].toLowerCase();
    return `Prefix has been set to \`${args[0]}\``
}