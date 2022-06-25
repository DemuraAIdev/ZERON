const fs = require('fs');

if (!fs.existsSync('./src/logs')) {
    fs.mkdirSync('./src/logs');
    console.info('(1/2) logs directory created');
}
if (!fs.existsSync('./src/temp')) {
    fs.mkdirSync('./src/temp');
    console.info('(2/4) temp directory created');
    fs.writeFileSync('src/temp/client_id.json', '{}');
    if (fs.existsSync('./src/temp/client_id.json')) {
        fs.writeFileSync('src/temp/client_id.json', '{}');
        console.info('(3/4) FIle Temp Created');
        console.warn('(4/4) Restarting Bot');
        process.exit(1);
    }
}

