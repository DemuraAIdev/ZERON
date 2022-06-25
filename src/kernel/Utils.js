const Readline = require('../utils/readline');
const { post } = require('node-superfetch');
const id = require('./../temp/client_id.json').id;
module.exports = class Utils {
    constructor(client) {
        this.client = client;
        this.Readline = new Readline(client);
    }

    async hastebin(code) {
        const { body } = await post('https://hastebin.com/documents').send(code);
        return `https://hastebin.com/${body.key}.js`;
    }

    async random2option() {
        return Math.random() >= 0.5;
    }
    inviteGenerator() {
        const inviteBase = this.client.config.invite;
        const link = `https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=${inviteBase.permission_id}&scope=${inviteBase.scope}`;
        return link;
    }
};