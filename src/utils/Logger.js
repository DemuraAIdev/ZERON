const fs = require('fs');
const { format } = require('date-fns');
const filepath = 'src/logs/' + format(new Date(), 'yyyy-MM-dd') + '.log';
const type = {
    0: 'INFO',
    1: 'WARN',
    2: 'ERROR',
    3: 'DEBUG',
};
class Logger {

    log(types, message) {
        // save to file log.log the message
        const prefix = `[${format(Date.now(), 'yyyy-MM-dd HH:mm:ss (x)')} ${type[types]}]`;
        fs.appendFileSync(filepath, `${prefix} ${message}\n`);
    }
}

module.exports = Logger;