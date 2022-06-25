const fs = require('fs');

if (!fs.existsSync('./src/logs')) {
    fs.mkdirSync('./src/logs');
    console.info('(1/2) logs directory created');
}
if (!fs.existsSync('./src/temp')) {
    fs.mkdirSync('./src/temp');
    console.info('(2/2) temp directory created');
}
