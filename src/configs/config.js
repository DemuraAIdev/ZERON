const { Intents } = require('discord.js');
exports.ClientOptions = {
    allowedMentions: { parse: ['users'] },
    intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES],
    retryLimit: 3,

};
exports.SystemConf = {
    name: 'ZERON',
    OwnerName: 'DemuraAI',
    ownerID: ['754192220843802664'],
    prefix: 'z!',
    version: '1.0.0',
    repo: 'https://github.com/DemuraAIdev/ZERON.git',
    guildid: '901040545265225768',
};
exports.dbmongo = {
    url: 'mongodb://localhost:27017/',
    dbname: 'zeron',
};
exports.Shard = {
    respawn: true,
    respawnTime: 30000,
    mode: 'process',
    totalShards: 2,
};
exports.Webserv = {
    port: 3000,
    host: 'localhost',
};
// NOTE: RAM in MB
exports.health = {
    interval: 2000,
    ram: '90',
};
exports.service = {
    webscocket: false,
    webserver: false,
    health: true,
};

exports.presence = {
    status: 'online',
    activitiesList: [
        { name: 'with ZERON', type: 'WATCHING' },
        { name: 'with ZERON', type: 'PLAYING' },
        { name: 'with ZERON', type: 'LISTENING' },
    ],
    interval: 30000,
};


exports.configVersion = '1';
