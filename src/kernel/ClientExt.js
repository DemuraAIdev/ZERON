const { Client } = require('discord.js');
const { resolve } = require('path');
const { execSync } = require('child_process');
const config = require('../configs/config');
const EventLoader = require('./EventLoader');
const PluginLoader = require('./PluginLoader');
const CmdLoader = require('./CmdLoader');
const DBcache = require('../utils/DBcache');
const Utils = require('./Utils');
const WebServ = require('./WebServ');
const Logger = require('../utils/Logger');

/**
 * ZERON Client
 * @extends Client
 * @author DemuraAI
 */
module.exports = class ClientExt extends Client {
    constructor(options) {
        super(options);
        this.config = config.SystemConf;
        this.service = config.service;
        this.utils = new Utils(this);
        this.logger = new Logger();
    }
    EventLoaders = new EventLoader(this, resolve(__dirname, '..', 'modules', 'events'));
    PluginLoaders = new PluginLoader(this, resolve(__dirname, '..', 'modules', 'plugin'));
    CmdLoaders = new CmdLoader(this, resolve(__dirname, '..', 'modules', 'commands'));
    WebServ = new WebServ(this);
    DBcache = new DBcache();

    async init(token) {
        await this.EventLoaders.load();
        await this.PluginLoaders.load();
        await this.CmdLoaders.load();
        await this.WebServ.listen();
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