const mongoose = require('mongoose');
const linkSchema = require('../../schemas/link');

module.exports = async (Discord, client, msg, args) => {
    if (!args.length) return 'No action specified'
    let types = [
        'player',
        'guild',
        'faction',
        'p',
        'g',
        'f'
    ]
    let types2 = [
        'player',
        'guild',
        'faction',
        'player',
        'guild',
        'faction'
    ];
    let action = [
        'remove',
        'add',
        'reset',
        'show'
    ]

    switch (args[0].toLowerCase()) {
        case 'add': {
            let links = await linkSchema.findOne({ userID: msg.member.user.id });
            let input = args.slice(2).join(' ');
            if (!args[1]) return `Type unspecified`
            if (!types.includes(args[1].toLowerCase())) return `Invalid type \`${args[1]}\`\n\nList of types:\n- \`${types.slice(0, 3).join('`\n- `')}\``;
            let inputType = types2[types.indexOf(args[1].toLowerCase())]
            if (!args[2]) return `Input unspecified`;
            if (!input) return `Input unspecified`;
            if (!links) {
                let data = {};
                data[inputType] = input
                const newLink = new linkSchema({
                    _id: mongoose.Types.ObjectId(),
                    userID: msg.member.user.id,
                    data: data
                })
                newLink.save().catch(e => {
                    console.log(e)
                    return {
                        embeds: [
                            new Discord.MessageEmbed()
                                .setColor('RED')
                                .setDescription('Something went wrong when saving the link, try again later')
                        ]
                    }
                })
            } else {
                let data = links.data
                data[inputType] = input
                await links.updateOne({
                    data: data
                })
            };

            return `Linked \`${input}\` as a ${inputType}`
        };
        case 'remove': {
            let links = await linkSchema.findOne({ userID: msg.member.user.id });
            let input = args.slice(2).join(' ');
            if (!args[1]) return `Type unspecified`
            if (!types.includes(args[1].toLowerCase())) return `Invalid type \`${args[1]}\`\n\nList of types:\n- \`${types.slice(0, 3).join('`\n- `')}\``;
            let inputType = types2[types.indexOf(args[1].toLowerCase())]
            if (!links) return 'You have no links';
            else {
                let newData = links.data;
                if (!newData[inputType]) return `You didn't even link a ${inputType}`
                delete newData[inputType]
                await links.updateOne({
                    data: newData
                })
                if (!Object.keys(newData).length) {
                    await linkSchema.findOneAndDelete({ userID: msg.member.user.id });
                }
            }
            if (!args[1]) return `Type unspecified`
            let typeData = links.data[inputType];
            return `Unlinked ${inputType}`
        };
        case 'reset': {
            let links = await linkSchema.findOne({ userID: msg.member.user.id });
            if (!links) return 'You have no links';
            else await linkSchema.findOneAndDelete({ userID: msg.member.user.id });

            return `Removed all Links`
        };
        case 'show': {
            let links = await linkSchema.findOne({ userID: msg.member.user.id });
            if (!links) return 'You have no links';
            else {
                let res = [];
                for (let i in links.data) {
                    res.push(`**${require('../../functions/upper')(i)}:** ${links.data[i]}`)
                }
                return {
                    embeds: [
                        new Discord.MessageEmbed()
                            .setColor(client.color)
                            .setAuthor(msg.member.user.tag, msg.member.user.displayAvatarURL())
                            .setTitle(`${Object.keys(links.data).length} Links`)
                            .setDescription(res.join('\n'))
                            .setTimestamp()
                    ]
                }
            }
        };
        default: return `Invalid action \`${args[0]}\`\n\nList of actions:\n- \`${action.join('`\n- `')}\``;
    }
}