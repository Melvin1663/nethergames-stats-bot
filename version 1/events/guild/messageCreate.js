const mongoose = require('mongoose');
const prefixSchema = require('../../models/prefix');
const ps = require('pretty-seconds');

module.exports = async (Discord, client, message) => {
  if (!message) return;
  if (!message.guild) return;
  if (message.author.bot) return;
  if (!message.guild.me.permissions.has("SEND_MESSAGES")) return;
  
  if (!client.tempPrefix[message.guild.id]) {
    let aPrefix = await prefixSchema.findOne({ guildID: message.guild.id });
    if (!aPrefix) client.tempPrefix[message.guild.id] = 'ns!'
    else client.tempPrefix[message.guild.id] = aPrefix.prefix
  }

  var prefix = client.tempPrefix[message.guild.id];

  if (message.content.includes(`<@${client.user.id}>`) || message.content.includes(`<@!${client.user.id}>`)) return message.reply(`My current prefix is \`${prefix}\``)
  if (!message.content.toLowerCase().startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();
  const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
  if (!command) return;

  if (message.channelId == '866597598634442765') return message.reply({ content: "Looks like this isn't the Correct channel to use this", ephemeral: true })

  const validPermissions = Object.keys(Discord.Permissions.FLAGS)

  if (command.MemberPerms && command.MemberPerms.length) {
    let requiredPerms = []
    command.MemberPerms.forEach((perm) => {
      if (!validPermissions.includes(perm)) return console.log(`Invalid Permission "${perm}" at ${command.name}`);
      let a = perm.toLowerCase().replace('_', ' ').replace('guild', 'Server')
      let b = a.charAt(0).toUpperCase() + a.slice(1)
      if (!message.member.hasPermission(perm)) requiredPerms.push(`<:no:841251268358176798> ${b}`);
      else requiredPerms.push(`<:yes:841251268353064960> ${b}`)
    })
    if (requiredPerms.filter(i => i.includes('<:no:841251268358176798>')).length > 0) return message.reply({
      embeds: [
        new Discord.MessageEmbed()
          .setAuthor("Permission Denied", "https://i.imgur.com/5oDcvHR.png")
          .setDescription("You are missing the following Permissions:\n\n" + requiredPerms.join('\n'))
          .setColor("#FF0000")
      ]
    })
  }

  if (command.BotPerms && command.BotPerms.length) {
    let requiredPerms = []
    command.BotPerms.forEach((perm) => {
      if (!validPermissions.includes(perm)) return console.log(`Invalid Permission "${perm}" at ${command.name}`);
      let a = perm.toLowerCase().replace('_', ' ').replace('guild', 'Server')
      let b = a.charAt(0).toUpperCase() + a.slice(1)
      if (!message.guild.me.hasPermission(perm)) requiredPerms.push(`<:no:841251268358176798> ${b}`);
      else requiredPerms.push(`<:yes:841251268353064960> ${b}`)
    })
    if (requiredPerms.filter(i => i.includes('<:no:841251268358176798>')).length > 0) return message.reply({
      embeds: [
        new Discord.MessageEmbed()
          .setAuthor("Missing Permissions", "https://i.imgur.com/5oDcvHR.png")
          .setDescription("I am missing the following Permissions:\n\n" + requiredPerms.join('\n'))
          .setColor("#FF0000")
      ]
    })
  }

  if (!client.cooldowns.has(command.name)) {
    client.cooldowns.set(command.name, {});
  }

  const current_time = Date.now();
  const time_stamps = client.cooldowns.get(command.name);
  const cooldown_amount = (command.cooldown) * 1000;

  if (message.author.id in time_stamps) {
    const expiration_time = time_stamps[message.author.id] + cooldown_amount;

    if (current_time < expiration_time) {
      const time_left = (expiration_time - current_time) / 1000;

      return message.reply(`Please wait **${time_left.toFixed(0)} seconds** before using this command.`);
    }
  }

  time_stamps[message.author.id] = current_time
  setTimeout(() => delete time_stamps[message.author.id], cooldown_amount)

  try {
    command.execute(client, message, cmd, args, Discord);
  } catch (e) {
    message.reply(`Error: ${e.message}`);
    console.log(e);
  }
};
