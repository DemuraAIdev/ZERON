require('dotenv').config();
require('./lib/console');
const ClientExt = require('./kernel/ClientExt');
const { ClientOptions } = require('./configs/config');
const { tokenbot } = require('./configs/token');

const client = new ClientExt(ClientOptions);
client.logger.log(0, 'Start Log');
client.on('error', console.error);
client.on('warn', console.warn);
client.init(tokenbot);

process.on('unhandledRejection', (p) => {
    console.error('Unhandled Rejection at:', p);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});