class DBcache {
    constructor(table) {
        this.cache = {};
        this.table = table;
    }
    create(data) {
        this.cache[this.table] = data;
    }
    set(data) {
        this.cache[this.table] = data;
    }
    get() {
        return this.cache[this.table];
    }
    delete() {
        delete this.cache[this.table];
    }

}
module.exports = DBcache;