const { Client } = require('discord.js');
const { resolve } = require('path');
const { execSync } = require('child_process');
const mongoose = require('mongoose');
const config = require('../configs/config');
const EventLoader = require('./EventLoader');
const CmdLoader = require('./CmdLoader');
const DBcache = require('../utils/DBcache');
const Utils = require('./Utils');
const WebServ = require('./WebServ');
const Logger = require('../utils/Logger');
const fs = require('fs');

/**
 * ZERON Client
 * DemuraCorev1.1.0
 * based INTI-Hirano Core
 * @extends Client
 * @author DemuraAI
 */
class ClientExt extends Client {
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
    SysCache = new DBcache();

    async init(token) {
        console.info('Starting DemuraCore...');
        this.logger.log(0, 'Starting DemuraCore');
        mongoose.connect(config.mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.info('Connected to the MongoDB database.');
        }).catch((err) => {
            console.error('Unable to connect to the Mongodb database. Error:' + err);
        });
        await this.EventLoaders.load();
        await this.CmdLoaders.load();
        await this.WebServ.listen();
        await this.login(token);
        await fs.writeFileSync('src/temp/client_id.json', `{"id": ${this.application.id}}`);
    }

    async update(aut, res) {
        const stdouts = await execSync(`git remote set-url origin ${this.config.repo} && git pull`);
        const stdout = stdouts.toString();
        console.info(stdout);
        this.logger.log(0, 'Updating System');
        if (aut) {
            console.warn('Reload bot due to system update');
            this.logger.log('Reload bot due to system update');
            await this.reload();
        }
        if (res) {
            console.warn('Restarting bot due to system update');
            this.logger.log('Restarting bot and all shards due to system update');
            this.shard.respawnAll();
        }
        return stdout;
    }

    async reload() {
        await this.EventLoaders.reload();
        await this.CmdLoaders.reload();
    }
}
module.exports = ClientExt;