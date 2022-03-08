const { Client } = require('Discord.js');
const EventLoader = require('./EventLoader');
const PluginLoader = require('./PluginLoader');
const { resolve } = require('path');
module.exports = class ClientExt extends Client {
    constructor(options) {
        super(options);
    }
    EventLoaders = new EventLoader(this, resolve(__dirname, '..', 'modules', 'events'));
    PluginLoaders = new PluginLoader(this, resolve(__dirname, '..', 'modules', 'plugin'));

    init(token) {
        this.EventLoaders.load();
        this.PluginLoaders.load();

        this.login(token);
    }


};