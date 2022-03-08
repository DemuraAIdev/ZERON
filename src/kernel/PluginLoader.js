const fs = require('fs');
const { resolve } = require('path');
const DBcache = require('../utils/DBcache');
module.exports = class PluginLoader {
    constructor(client, path) {
        this.client = client;
        this.path = path;
        this.cache = new DBcache('pluginFile');
    }
    load() {
        this.cache.create([]);
        fs.readdir(this.path, (err, categories) => {
            console.info(`Found ${categories.length} category Plugns`);
            categories.forEach(category => {
                fs.readdir(resolve(this.path, category), (err, files) => {
                    console.info(`Found ${files.length} Plugns in ${category}`);
                    files.forEach(file => {
                        console.info(`Loading Plugin ${file}`);
                        try {
                            require(resolve(this.path, category, file));
                        }
                        catch (error) {
                            console.error('Error Loading Plugin' + file);
                            throw new Error(`File ${file} is not a valid Plugin file`);
                        }
                        const plugin = require(resolve(this.path, category, file));
                        const FilePLugin = require(resolve(this.path, category, 'plugin.json'));
                        this.cache.set({
                            name: FilePLugin.name,
                            category: category,
                            run: plugin.execute,
                            path: resolve(this.path, category, file),
                        });
                        console.info(this.cache.get());

                    });
                });

            });
        });
    }
};