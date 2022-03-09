const { Client } = require('Discord.js');
const EventLoader = require('./EventLoader');
const PluginLoader = require('./PluginLoader');
const { resolve } = require('path');
const DBcache = require('../utils/DBcache');
const { SystemConf } = require('../configs/config');
const { execSync } = require('child_process');

/**
 * ZERON Client
 * @extends Client
 * @author DemuraAI
 */
module.exports = class ClientExt extends Client {
    constructor(options) {
        super(options);
        this.config = SystemConf;
    }
    EventLoaders = new EventLoader(this, resolve(__dirname, '..', 'modules', 'events'));
    PluginLoaders = new PluginLoader(this, resolve(__dirname, '..', 'modules', 'plugin'));
    DBcache = new DBcache();

    init(token) {
        require('../utils/Welcomer');
        this.EventLoaders.load();
        this.PluginLoaders.load();
        this.DBcache.load();
        this.login(token);
    }

    update() {
        // update from github using git pull
        execSync('git remote set-url origin https://github.com/DemuraAIdev/DotBot.git && git pull', (err, stdout) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stdout);
        });
    }


};