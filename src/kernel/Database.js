const sqlite3 = require('sqlite3').verbose();

class Database {
    constructor(client, path) {
        this.path = path;
        this.client = client;
        this.db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
            if (err) throw err;
            client.logger.log(0, 'Connected to local database');
        });
    }
    createTable(syntax) {
        const sql = `CREATE TABLE IF NOT EXISTS ${syntax}`;
        this.db.run(sql, (err) => {
            if (err) throw err;
            return ('Table created');
        });

        // this.db.close();
    }
    insert(table, name, value) {
        const syntax = `INSERT INTO ${table} ${name} VALUES ${value}`;
        this.db.run(syntax, (err) => {
            if (err) return err;
        });
        return ('1 record inserted');
    }

}
module.exports = Database;