require('dotenv').config();
require('./lib/console');

const { tokenbot } = require('./configs/token');
const { Shard } = require('./configs/config');
const { ShardingManager } = require('discord.js');
const health = require('./utils/health');

Shard.token = tokenbot;
const manager = new ShardingManager('./src/bot.js', Shard);

console.info('*************************************');
console.info('*         ZERON BOOTLOADER          *');
console.info('*************************************');

require('./utils/setup');

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
        if (process.exitCode > 0) {
            console.error(`Shard ${shard.id} died with code ${process.exitCode}`);
            return console.error(`Restarting bot Shard ${shard.id}`);
        }
        if (process.exitCode === 0) {
            console.error(`Shard ${shard.id} exit with code ${process.exitCode}`);
            return stop();
        }

    });
}).spawn()
    .then(() => {
        console.info('All shard launched');
    }).catch(err => {
        console.error(err);
        require('./RecoveryMod');
    },
    );
function stop() {
    console.warn('Stopping shard');
    healthCheck.destroy();
    console.error('Shard stopped');
    process.exit(0);
}