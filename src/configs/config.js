const { Intents } = require('discord.js');
exports.ClientOptions = {
    allowedMentions: { parse: ['users'] },
    intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS],
    retryLimit: 3,
};
exports.SystemConf = {
    name: 'ZERON',
    OwnerName: 'DemuraAI',
    ownerID: ['', ''],
    prefix: 'z!',
    version: '1.0.0',
    repo: 'https://github.com/DemuraAIdev/ZERON.git',
};
exports.shardCount = 'auto';
exports.health = {
    enabled: true,
    interval: 2000,
    ram: '90 MB',
};

exports.configVersion = '1';
