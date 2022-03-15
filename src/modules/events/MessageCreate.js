module.exports = async (client, message) => {
    const prefix = client.config.prefix;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command = client.Cmd.get(commandName);
    if (!command) return;

    if (command.Isdev) {
        if (message.author.id !== client.config.ownerID) return message.reply({ content: 'You are not the owner of this bot.', ephemeral: true });
    }

    try {
        await command.run(client, message, args);
        console.info(`Executed command Msg ${commandName}`);
    }
    catch (error) {
        console.error(error);
        await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
};