require('dotenv').config();
require('./LibLoader.js');
const ClientExt = require('./kernel/ClientExt');
const { ClientOptions } = require('./configs/config');
const { tokenbot } = require('./configs/token');

const client = new ClientExt(ClientOptions);
client.on('error', console.error);
client.on('warn', console.warn);
client.init(tokenbot);

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});