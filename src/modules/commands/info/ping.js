/**
 * Ping Commands
 * @description ping command
 * @author DemuraAI
 */

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
exports.run = async (client, interaction) => {
    // ping
    const ping = Math.round(client.ws.ping);
    const embed = new MessageEmbed()
        .setColor('GREEN')
        .addField('Ping', `${ping}ms`);
    interaction.reply({ embeds: [embed] });
};
// data slash command
exports.data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping Bot');

exports.conf = {
    name: 'ping',
    aliases: [],
    permBot: ['SEND_MESSAGES'],
    permUser: [],
    cooldown: 0,
    ReqArgs: false,
    Isdev: false,
    slash: true,
    text: true,
    help: {
        description: 'ping, pong',
        usage: '',
        example: 'ping',
    },
};