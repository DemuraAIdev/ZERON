/**
 * Test Commands
 * @description Test code
 * @author DemuraAI
 */


const { SlashCommandBuilder } = require('@discordjs/builders');
const CreateEmbed = require('../../../utils/CreateEmbed');
exports.run = async (client, input, args) => {
    const chose = (args === undefined) ? input.options.getString('input1') : args[0];
    const embed = CreateEmbed('error', `#input1 ${chose}`);
    input.reply({ embeds: [embed] });

};
// data slash command
exports.data = new SlashCommandBuilder()
    .setName('test')
    .setDescription('Tets the bot')
    .addStringOption(option =>
        option.setName('input1')
            .setDescription('The input to echo back')
            .setRequired(true));


exports.conf = {
    name: 'test',
    Isdev: false,
    slash: true,
    text: false,
    aliases: ['t'],
};

// Function