const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

module.exports = class readlines {
    constructor(client) {
        this.client = client;
        rl.on('line', (input) => {
            try {
                console.debug(eval(input));
            }
            catch (error) {
                console.error(error);
            }
        });
        rl.on('close', () => {
            console.warn('Shutdown...');
            client.destroy();
            process.exit(0);
        });
    }
};