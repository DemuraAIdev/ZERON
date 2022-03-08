module.exports = {
    name: 'ready',
    once: true,
    event: 'discordjs',
    execute(client) {
        console.info(`Ready! Logged in as ${client.user.tag}`);
    },
};