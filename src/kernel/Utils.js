const Readline = require('../utils/readline');
module.exports = class Utils {
    constructor(client) {
        this.client = client;
        this.Readline = new Readline(client);
    }

};