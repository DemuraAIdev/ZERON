const fs = require('fs');
const { resolve } = require('path');
const DBcache = require('../utils/DBcache');
/**
 * PluginLoader
 */
module.exports = class PluginLoader {
    constructor(client, path) {
        this.client = client;
        this.path = path;
        this.client.Plugin = new DBcache();
    }
    load() {
        fs.readdir(this.path, (err, categories) => {
            console.info(`Found ${categories.length} category Plugns`);
            categories.forEach(category => {
                const moduleconf = require(resolve(this.path, category, 'plugin.json'));
                fs.readdir(resolve(this.path, category), (err, files) => {
                    console.info(`Found ${files.length} Plugns in ${category}`);
                    files.forEach(file => {
                        if (!file.endsWith('index.js')) return;
                        console.info(`Loading Plugin ${file}`);
                        try {
                            require(resolve(this.path, category, file));
                        }
                        catch (error) {
                            console.error('Error Loading Plugin' + file);
                            throw new Error(`File ${file} is not a valid Plugin file`);
                        }
                        const plugin = require(resolve(this.path, category, file));
                        this.client.Plugin.set(moduleconf.name, plugin);
                        if (plugin.autostart) {
                            plugin.execute();
                        }
                    });
                });

            });
        });
    }
    disable(name) {
        // delete in map
        if (this.client.Plugin.has(name)) {
            this.client.Plugin.delete(name);
            return true;
        }
        else {
            console.warn(`Plugin ${name} not found`);
            return false;
        }
    }
    reload(name) {
        if (this.client.Plugin.has(name)) {
            const plugin = this.client.Plugin.get(name);
            this.client.Plugin.delete(name);
            this.client.Plugin.set(name, plugin);
            return true;
        }
        else {
            console.warn(`Plugin ${name} not found`);
            return false;
        }
    }
    reloadALL() {
        this.client.Plugin.clear();
        this.load();
    }
};