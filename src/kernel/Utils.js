const Readline = require('../utils/readline');
const { post } = require('node-superfetch');
module.exports = class Utils {
    constructor(client) {
        this.client = client;
        this.Readline = new Readline(client);
    }

    async hastebin(code) {
        const { body } = await post('https://hastebin.com/documents').send(code);
        return `https://hastebin.com/${body.key}.js`;
    }

    async randomtruefalse() {
        return Math.random() >= 0.5;
    }

};