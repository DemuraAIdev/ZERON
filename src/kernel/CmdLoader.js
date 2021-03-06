const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { resolve } = require('path');
const { tokenbot } = require('../configs/token');
const fs = require('fs');
const DBcache = require('../utils/DBcache');
const rest = new REST({ version: '9' }).setToken(tokenbot);
module.exports = class CmdLoader {
    constructor(client, path) {
        this.client = client;
        this.path = path;
        this.client.Cmd = new DBcache();
        this.client.Cmd.set('aliases', new DBcache());
        this.client.Cmd.set('cooldowns', new DBcache());
    }
    async load() {
        const slash = [];
        fs.readdir(this.path, (err, categories) => {
            console.info(`Found ${categories.length} category Commands`);
            categories.forEach(category => {
                // const moduleconf = require(resolve(this.path, category, 'module.json'));
                fs.readdir(resolve(this.path, category), (err, files) => {
                    files.forEach(file => {
                        if (!file.endsWith('.js')) return;
                        try {
                            require(resolve(this.path, category, file));
                        }
                        catch (error) {
                            console.error('Error Loading Command' + file);
                            this.client.logger.log(2, 'Error Loading Command' + file);
                            return console.error('This command will not be loaded');
                        }
                        const command = require(resolve(this.path, category, file));
                        if (command.conf === undefined) throw new Error(`File ${file} is not a valid Command file`);
                        this.client.Cmd.set(command.conf.name, command);
                        this.registerOpt(command.conf.name);

                        // Register Slash Command
                        if (!command.conf.slash) return;
                        slash.push(command.data.toJSON());
                        this.register(slash, command.conf.name);

                    });
                });
            });
        });
        return this.client.Cmd;
    }
    reload() {
        this.clear();
        this.client.logger.log(0, 'Reloaded Commands');
        console.info('Reloaded Commands');
        return this.load();
    }
    clear() {
        this.client.Cmd.clear();
        this.client.Cmd.set('aliases', new DBcache());
        this.client.Cmd.set('cooldowns', new DBcache());
        this.client.logger.log(0, 'Cleared Commands');
    }

    async registerOpt(name) {
        const aliases = this.client.Cmd.get('aliases');
        const cooldowns = this.client.Cmd.get('cooldowns');
        // Aliases
        const cmd = this.client.Cmd.get(name);
        if (cmd === undefined) throw new Error(`Command ${name} does not exist`);
        if (cmd.conf.aliases === undefined) return;
        cmd.conf.aliases.forEach(alias => {
            aliases.set(alias, name);
        });
        // Coldowns
        cooldowns.set(cmd.conf.name, new DBcache());
        return true;
    }
    async register(slash, name) {
        await rest.put(Routes.applicationGuildCommands('989775174150815765', '901040545265225768'), { body: slash })
            .then(() => console.info('Registered Slash Command ' + name))
            .catch(console.error);
    }
};