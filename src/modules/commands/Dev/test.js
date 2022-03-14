const { SlashCommandBuilder } = require('@discordjs/builders');
exports.run = async (interaction) => {
    interaction.reply({ content: 'This is a test message', ephemeral: true });
};
// data slash command
exports.data = new SlashCommandBuilder()
    .setName('test')
    .setDescription('Tets the bot');

exports.conf = {
    name: 'test',
    Isdev: true,
};