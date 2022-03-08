const { Intents } = require('discord.js');
exports.ClientOptions = {
    allowedMentions: { parse: ['users'] },
    intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS],
    retryLimit: 3,
};
exports.SystemConf = {
    name: 'ZERON',
    ownerID: ['', ''],
};
