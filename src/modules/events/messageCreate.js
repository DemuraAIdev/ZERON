module.exports = async (client, message) => {
    if (message.author.bot || message.author === client.user) return;
    const prefix = client.config.prefix;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    /**
     * PLUGIN
     * @dir ../plugin/
     */

    // SYSTEM
    const commandName = args.shift().toLowerCase();
    const command = client.Cmd.get(commandName) || client.Cmd.get(client.Cmd.get('aliases').get(commandName));
    if (!command) return;
    if (!command.conf.text) return;
    if (command.conf.Isdev) {
        if (!client.config.ownerID.includes(message.author.id)) return message.reply({ content: 'You are not the owner of this bot.', ephemeral: true });
    }
    if (!message.member.permissions.has(command.conf.permUser)) return message.channel.send({ content: `You need Permission!\n**Require: ${command.conf.permUser} **`, ephemeral: true });
    if (!message.guild.me.permissions.has(command.conf.permBot)) return message.channel.send({ content: `The Bot need Permission!\n**Require: ${command.conf.permBot} **`, ephemeral: true });
    if (command.conf.ReqArgs && !args.length) return message.channel.send({ content: `You need to provide arguments!\n**Usage: ${prefix}${command.conf.name} ${command.conf.help.usage}**`, ephemeral: true });
    if (command.conf.cooldown > 0) {
        const now = Date.now();
        const timestamps = client.Cmd.get('cooldowns');
        const cooldownAmount = (command.conf.cooldown || 3) * 1000;
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply({ content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.conf.name}\` command.` });
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
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
        client.logger.log(2, error);
        message.channel.send({ content: `\`\`\`js\n${error}\`\`\`` });
    }


};