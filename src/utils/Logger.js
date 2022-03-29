const fs = require('fs');

function log(message) {
    // save to file log.log the message
    fs.appendFile('log.log', message + '\n', (err) => {
        if (err) throw err;
    });
}

module.exports = log;