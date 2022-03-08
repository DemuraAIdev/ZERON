require('dotenv').config();
require('./LibLoader.js');
const ClientExt = require('./kernel/ClientExt');
const { ClientOptions } = require('./configs/config');
const { tokenbot } = require('./configs/token');

const client = new ClientExt(ClientOptions);
client.init(tokenbot);