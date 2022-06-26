const config = require('../configs/config');

module.exports = class health {
    constructor() {
        if (config.configVersion !== '2') {
            console.error('Config version is not compatible');
            process.exit(1);
        }
    }
    runtime() {
        if (!config.service.health) return console.warn('Health protection is disabled');
        console.info('Health enabled');
        console.info(`Checking Health every ${config.health.interval} ms`);
        console.info('Running Health service...');
        const confu = MbToBytes(config.health.ram);
        setInterval(function () {
            const used = process.memoryUsage().heapUsed;
            if (used > confu) {
                console.warn('Memory usage overload');
                process.exit(1);
            }
        }, config.health.interval);

    }
    destroy() {
        console.error('Stopping health service...');
        clearInterval(this.interval);
        console.error('Health service stopped');
    }

};
function MbToBytes(mb) {
    return mb * 1024 * 1024;
}