const { SlashCommandBuilder } = require('@discordjs/builders');
const CreateEmbed = require('../../../utils/CreateEmbed');
exports.run = async (interaction) => {
    const embed = CreateEmbed('error', 'This is a test command');
    interaction.reply({ embeds: [embed] });
};
// data slash command
exports.data = new SlashCommandBuilder()
    .setName('test')
    .setDescription('Tets the bot');

exports.conf = {
    name: 'test',
    Isdev: true,
};