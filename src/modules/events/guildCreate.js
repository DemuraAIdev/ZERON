const { presence } = require('../../configs/config');
module.exports = async (client, guild) => {
    console.info(`Joined guild ${guild.name}`);
    client.user.setPresence({
        activities: [{
            name: `Welcome ${guild.name}!`,
            type: 'WATCHING',
        }],
        status: presence.status,
    });
};