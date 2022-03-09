const fs = require('fs');
class DBcache {
    // create class DBcache USING map
    constructor() {
        this.cache = new Map();
    }
    async set(key, value) {
        this.cache.set(key, value);
    }
    get(key) {
        if (!key) return undefined;
        return this.cache.get(key);
    }
    delete(key) {
        this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
    has(key) {
        return this.cache.has(key);
    }

    get size() {
        return this.cache.size;
    }

    get getALL() {
        return this.cache;
    }
    save() {
        const obj = Object.fromEntries(this.cache);
        fs.writeFileSync('./src/tmp/DBcache.json', JSON.stringify(obj));
    }
    load() {
        if (fs.existsSync('./src/tmp/DBcache.json')) {
            const obj = JSON.parse(fs.readFileSync('./src/tmp/DBcache.json'));
            this.cache = new Map(Object.entries(obj));
            console.info('DBcache.json Loaded');
        }
        else {
            console.info('DBcache.json not found');
        }
    }
}
module.exports = DBcache;