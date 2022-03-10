const { MessageEmbed } = require('discord.js');

const hexColors = {
    info: '#d9ab59',
    warn: 'YELLOW',
    success: '#8ed959',
    error: '#d46250',
};

module.exports = function createEM(type, message) {
    const embed = new MessageEmbed()
        .setColor(hexColors[type]);
    if (message) embed.setDescription(message);
    return embed;
};