const { Client } = require('discord.js');
const { resolve } = require('path');
const { execSync } = require('child_process');
const config = require('../configs/config');
const EventLoader = require('./EventLoader');
const CmdLoader = require('./CmdLoader');
const DBcache = require('../utils/DBcache');
const Utils = require('./Utils');
const WebServ = require('./WebServ');
const Logger = require('../utils/Logger');

/**
 * ZERON Client
 * DemuraCorev1.1.0
 * based INTI-Hirano Core
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
        this.version = 'DemuraCore-Bot-1.1.0';
    }
    EventLoaders = new EventLoader(this, resolve(__dirname, '..', 'modules', 'events'));
    CmdLoaders = new CmdLoader(this, resolve(__dirname, '..', 'modules', 'commands'));
    WebServ = new WebServ(this);
    DBcache = new DBcache();

    async init(token) {
        console.info('Starting DemuraCore...');
        this.logger.log(0, 'Starting DemuraCore');
        await this.EventLoaders.load();
        await this.PluginLoaders.load();
        await this.CmdLoaders.load();
        await this.WebServ.listen();
        await this.login(token);
    }

    async update(aut) {
        await execSync(`git remote set-url origin ${this.config.repo}  && git pull`, (err, stdout) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stdout);
        });
        if (aut) {
            await this.reload();
        }
    }

    async reload() {
        await this.EventLoaders.reload();
        await this.PluginLoaders.reloadALL();
        await this.CmdLoaders.reload();
    }
};