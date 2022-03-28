const { Webserv } = require('../configs/config');
const http = require('http');
const server = http.createServer();
module.exports = class WebServ {
    constructor(client) {
        this.client = client;
    }
    listen() {
        if (!this.client.service.webserver) return;
        console.info('Running WebServer service...');
        server.on('request', (request, res) => {
            res.end('Hello World! This is my first pure Node.js server');
        });
        server.listen(Webserv.port, Webserv.host, () => {
            console.info(`WebServer running at http://${Webserv.host}:${Webserv.port}/`);
        });
    }

};