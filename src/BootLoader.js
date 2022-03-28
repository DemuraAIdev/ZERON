require('dotenv').config();
require('./LibLoader.js');
const { tokenbot } = require('./configs/token');
const { Shard } = require('./configs/config');
const { ShardingManager } = require('discord.js');
const fs = require('fs');
const health = require('./utils/health');
Shard.token = tokenbot;
const manager = new ShardingManager('./src/bot.js', Shard);

console.info('*************************************');
console.info('*         ZERON BOOTLOADER          *');
console.info('*************************************');

// check if file setup.js exists if exists run it and stop the bootloader
if (fs.existsSync('./src/setup.js')) {
    console.info('setup.js found, running it');
    require('./setup.js');
}

const healthCheck = new health();
healthCheck.runtime();


manager.on('shardCreate', shard => {
    console.info(`Launching shard ${shard.id}`);
    shard.on('disconnect', () => {
        console.warn(`Shard ${shard.id} disconnected`);
    });
    shard.on('reconnecting', () => {
        console.warn(`Shard ${shard.id} reconnecting`);
    });
    shard.on('error', err => {
        console.error(`Shard ${shard.id} had an error but not restart: ${err}`);
    });
    shard.on('death', (process) => {
        if (process.exitCode === null) {
            console.warn(`Shard ${shard.id} died with code null / restart`);
            return console.warn('Restarting all shard');
        }
        if (process.exitCode > 0) {
            console.error(`Shard ${shard.id} died with code ${process.exitCode}`);
            return console.error(`Restarting bot Shard ${shard.id}`);
        }
        else {
            console.error(`Shard ${shard.id} exit with code ${process.exitCode}`);
            return stop();

        }

    });
}).spawn()
    .then(() => {
        console.info('All shard launched');
    }).catch(err => {
        console.error(err);
        stop();
    },
    );
function stop() {
    console.warn('Stopping shard');
    manager.broadcastEval('process.exit(0)');
    healthCheck.destroy();
    console.error('Shard stopped');
    process.exit(0);
}