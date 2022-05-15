module.exports = async (client, message) => {
    if (message.author.bot || message.author === client.user) return;
    const prefix = client.config.prefix;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command = client.Cmd.get(commandName) || client.Cmd.get(client.aliases.get(commandName));
    if (!command) return;
    if (!command.conf.text) return;
    if (command.conf.Isdev) {
        if (!client.config.ownerID.includes(message.author.id)) return message.reply({ content: 'You are not the owner of this bot.', ephemeral: true });
    }
    if (!message.member.permissions.has(command.conf.permUser)) return message.channel.send({ content: `You need Permission!\n**Require: ${command.conf.permUser} **`, ephemeral: true });
    if (!message.guild.me.permissions.has(command.conf.permBot)) return message.channel.send({ content: `The Bot need Permission!\n**Require: ${command.conf.permBot} **`, ephemeral: true });
    try {
        await command.run(client, message, args);
        console.info(`Executed command ${commandName}`);
    }
    catch (error) {
        console.error(error);
        console.error(`Disabled command ${commandName}`);
        message.reply({ content: 'There was an error while executing this command! this command will disable', ephemeral: true });
        client.Cmd.delete(commandName);
        client.logger.log(2, `Disabled command ${commandName}`);
        message.channel.send({ content: `\`\`\`js\n${error}\`\`\`` });
    }


};