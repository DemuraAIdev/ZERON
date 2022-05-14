const { presence } = require('../../configs/config');
module.exports = async (client) => {
    client.logger.log(0, `Client Ready!, with ${client.Cmd.size} Commands`);
    client.user.setPresence({
        activities: [presence.activitiesList[0]],
        status: presence.status,
    });

    setInterval(async () => {
        const activity = presence.activitiesList[Math.floor(Math.random() * presence.activitiesList.length)];
        client.user.setPresence({
            activities: [activity],
            status: presence.status,
        });
    }, presence.interval);

    console.info(`Ready! Logged in as ${client.user.tag}`);
};