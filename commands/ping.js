const {RichEmbed} = require('discord.js');

module.exports.run = async (bot, msg, args) => {
    msg.channel.send('Requesting API Stats..').then(m => {
        const embed = new RichEmbed()
        .setTitle('Pong! :ping_pong:')
        .addField('HTTP API', `${m.createdTimestamp - msg.createdTimestamp}ms`)
        .addField('Roundtrip', `${Math.round(bot.ping)}ms`)
        .addBlankField(true)
        .addField('What does this mean?', `This means that it took \`${m.createdTimestamp - msg.createdTimestamp}ms\` to edit this message and \`${Math.round(bot.ping)}ms\` to respond,`)
        msg.channel.send(embed);
    });
};

module.exports.config = {
    command: "ping"
};