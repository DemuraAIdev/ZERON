require('dotenv').config();
require('./LibLoader.js');
const { tokenbot } = require('./configs/token');
const { shardCount } = require('./configs/config');
const { ShardingManager } = require('discord.js');
const health = require('./utils/health');

const manager = new ShardingManager('./src/bot.js', {
    token: tokenbot,
    totalShards: shardCount,
    respawn: true,
});

console.info('*************************************');
console.info('*         ZERON BOOTLOADER          *');
console.info('*************************************');

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
}).spawn().catch(console.error);
function stop() {
    console.warn('Stopping shard');
    manager.broadcastEval('process.exit(0)');
    healthCheck.destroy();
    process.exit(0);
}