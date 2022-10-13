const Discord = require('discord.js')

/**
 * @param {int} limit Maximum Search Results
 * @param {string} name Search Query
 * @param {string} type player, guild, or faction
 * @param {string} cmd Command filename
 * @param {boolean} disabled All Buttons disabled or not
 * @returns {object} Button String
 */
module.exports = async (limit, name, type, cmd, disabled) => {
    disabled = !disabled ? false : true;
    let fulls = await require('../functions/ng/full')(limit, name, type);
    if (fulls.code != 0) return fulls;

    let buttons = [new Discord.MessageActionRow()];

    fulls.json.forEach(q => buttons[0].addComponents(
        new Discord.MessageButton()
            .setCustomId(JSON.stringify({
                cmd: cmd,
                do: 'meant',
                data: q.name
            }))
            .setLabel(q.name)
            .setStyle('PRIMARY')
            .setDisabled(disabled),
    ))

    return { code: 0, json: buttons };
}