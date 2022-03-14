const DBcache = require('../utils/DBcache');
const fs = require('fs');
const { resolve } = require('path');
module.exports = class CmdLoader {
    constructor(client, path) {
        this.client = client;
        this.path = path;
        this.client.Cmd = new DBcache();
    }
    load() {
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
                        }
                        const command = require(resolve(this.path, category, file));
                        if (command.conf === undefined) throw new Error(`File ${file} is not a valid Command file`);
                        this.client.Cmd.set(command.conf.name, command);
                    });
                });
            });
        });
        return this.client.Cmd;
    }
    reload() {
        this.client.Cmd.clear();
        return this.load();
    }
};