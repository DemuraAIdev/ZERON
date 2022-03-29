const fs = require('fs');

if (!fs.existsSync('./src/logs')) {
    fs.mkdirSync('./src/logs');
    console.info('logs directory created');
}