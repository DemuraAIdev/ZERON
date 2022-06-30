const fs = require('fs');

if (!fs.existsSync('./src/logs')) {
    fs.mkdirSync('./src/logs');
    console.info('(1/6) logs directory created');
}
if (!fs.existsSync('./src/temp')) {
    fs.mkdirSync('./src/temp');
    console.info('(2/6) temp directory created');
    fs.writeFileSync('src/temp/client_id.json', '{}');
    if (fs.existsSync('./src/temp/client_id.json')) {
        fs.writeFileSync('src/temp/client_id.json', '{}');
        console.info('(3/6) FIle Temp Created');
        console.warn('(4/6) Cleaning Up');
    }
    fs.writeFileSync('src/database/guild.db', '');
    fs.writeFileSync('src/database/user.db', '');
    console.info('(5/6) Database Created');
    console.info('(6/6) Restart Bot');
    process.exit(1);

}

