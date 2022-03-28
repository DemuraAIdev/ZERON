const { Intents } = require('discord.js');

exports.ClientOptions = {
    allowedMentions: { parse: ['users'] },
    intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES],
    retryLimit: 3,

};
exports.SystemConf = {
    name: 'ZERON',
    OwnerName: 'DemuraAI',
    ownerID: ['', ''],
    prefix: 'z!',
    version: '1.0.0',
    repo: 'https://github.com/DemuraAIdev/ZERON.git',
    guildid: '901040545265225768',
};
exports.Shard = {
    respawn: true,
    respawnTime: 30000,
    mode: 'process',
    totalShards: 'auto',
};
exports.Webserv = {
    port: 3000,
    host: 'localhost',
};
exports.health = {
    interval: 2000,
    ram: '90 MB',
};
exports.service = {
    webscocket: false,
    webserver: true,
    health: true,
};

exports.presence = {
    status: 'online',
    activitiesList: [
        { name: 'with discord.js', type: 'WATCHING' },
        { name: 'with ZERON', type: 'PLAYING' },
        { name: 'with ZERON', type: 'LISTENING' },
    ],
    interval: 30000,
};

exports.configVersion = '1';
