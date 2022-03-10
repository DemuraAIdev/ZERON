const fs = require('fs');
const { resolve } = require('path');
module.exports = class EventLoader {
    constructor(client, path) {
        this.client = client;
        this.path = path;
    }
    load() {
        const Efile = fs.readdirSync(this.path).filter(file => file.endsWith('.js'));
        console.info('Found ' + Efile.length + ' events');
        for (const file of Efile) {
            try {
                require(resolve(this.path, file));
            }
            catch (error) {
                console.error('Error Loading Event' + file);
                throw new Error(`File ${file} is not a valid Event file`);
            }
            const event = require(resolve(this.path, file));
            if (event === undefined) throw new Error(`File ${file} is not a valid Event file`);
            if (event.once) {
                this.client.once(event.name, (...args) => event.execute(...args));
            }
            else {
                this.client.on(event.name, (...args) => event.execute(...args));
            }
        }
        return true;
    }
};