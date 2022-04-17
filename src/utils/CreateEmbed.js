const { MessageEmbed } = require('discord.js');
const DefEmbedCol = {
    info: 'BLUE',
    warn: 'YELLOW',
    success: 'GREEN',
    error: '#d46250',
};

module.exports = function createEM(type, message) {
    const embed = new MessageEmbed()
        .setColor(DefEmbedCol[type])
        .setFooter({ text: 'ZERON' })
        .setTimestamp();
    if (type === 'error') embed.setTitle('Error');
    if (message) embed.setDescription(message);
    return embed;
};