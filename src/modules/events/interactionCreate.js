module.exports = async (client, interaction) => {
    const command = await client.Cmd.get(interaction.commandName);
    if (command.Isdev) {
        if (interaction.author.id !== client.config.ownerID) return interaction.reply({ content: 'You are not the owner of this bot.', ephemeral: true });
    }
    if (!command) return;
    try {
        await command.run(client, interaction);
        console.info(`Executed command Interaction ${interaction.commandName}`);
    }
    catch (error) {
        console.error(error);
        client.logger.log(2, error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
};