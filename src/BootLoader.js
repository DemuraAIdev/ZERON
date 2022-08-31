require('dotenv').config();
require('./lib/console');

const { tokenbot } = require('./configs/token');
const { Shard } = require('./configs/config');
const { ShardingManager } = require('discord.js');
const health = require('./utils/health');
const Sentry = require('@sentry/node');

// Importing @sentry/tracing patches the global hub for tracing to work.
const SentryTracing = require('@sentry/tracing');

Sentry.init({
    dsn: 'https://95773f2a96f94547aaf1c97e063dd3a8@o1063042.ingest.sentry.io/6703330',

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
});

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