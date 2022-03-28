const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { tokenbot } = require('../../../configs/token');
exports.run = async (client, interaction) => {
    let evaled;
    const input = interaction.options.getString('input');
    const embed = new MessageEmbed()
        .addField('Input', `\`\`\`js\n${input}\`\`\``);
    try {
        evaled = eval(input);
        embed.setColor('GREEN');
        if (typeof evaled !== 'string') {
            evaled = require('util').inspect(evaled, {
                depth: 0,
            });
        }
        const output = clean(String(evaled));
        if (output.length > 1024) {
            const hastebin = await this.hastebin(output);
            embed.addField('Output', `${hastebin}.js`);
        }
        else { embed.addField('Output', `\`\`\`js\n${output}\`\`\``); }
    }
    catch (error) {
        const err = clean(error);
        embed.addField('Error', `\`\`\`js\n${err}\`\`\``);
        embed.setColor('RED');
    }

    interaction.reply({ embeds: [embed] });

};
// data slash command
exports.data = new SlashCommandBuilder()
    .setName('eval')
    .setDescription('Evals the code')
    .addStringOption(option =>
        option.setName('input')
            .setDescription('The code to eval')
            .setRequired(true));

exports.conf = {
    name: 'eval',
    Isdev: true,
};
function clean(string) {
    if (typeof string === 'string') {
        return string.replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(new RegExp(tokenbot, 'g'), '[RAHASIA]')
            .replace(/@/g, '@' + String.fromCharCode(8203));
    }
    else {
        return string;
    }
}