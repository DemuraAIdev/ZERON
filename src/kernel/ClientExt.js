const { Client } = require('discord.js');
const EventLoader = require('./EventLoader');
const PluginLoader = require('./PluginLoader');
const CmdLoader = require('./CmdLoader');
const { resolve } = require('path');
const DBcache = require('../utils/DBcache');
const { SystemConf } = require('../configs/config');
const { execSync } = require('child_process');
const Utils = require('./Utils');

/**
 * ZERON Client
 * @extends Client
 * @author DemuraAI
 */
module.exports = class ClientExt extends Client {
    constructor(options) {
        super(options);
        this.config = SystemConf;
        this.utils = new Utils(this);
    }
    EventLoaders = new EventLoader(this, resolve(__dirname, '..', 'modules', 'events'));
    PluginLoaders = new PluginLoader(this, resolve(__dirname, '..', 'modules', 'plugin'));
    CmdLoaders = new CmdLoader(this, resolve(__dirname, '..', 'modules', 'commands'));
    DBcache = new DBcache();

    async init(token) {
        await this.EventLoaders.load();
        await this.PluginLoaders.load();
        await this.CmdLoaders.load();
        await this.login(token);
    }

    async update() {
        await execSync(`git remote set-url origin ${this.config.repo}  && git pull`, (err, stdout) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stdout);
        });
    }


};