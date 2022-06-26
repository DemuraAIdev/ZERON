const fs = require('fs');
const http = require('https');
const link = 'https://raw.githubusercontent.com/DemuraAIdev/ZERON/master';
const dirli = require('./configs/FileDirSys.json');

console.clear();
console.info('Entering Auto Repair System');
console.info('Downloading latest version of Auto Repair System');
// getRemoteFile('RecoveryMod.js', 'RecoveryMod.js', 'temp');

const ascii = `
|                                    |
|       AUTO REPAIR SYSTEM v3.0      |
|                                    |
`;

console.info(ascii);
console.info('Checking for broken components');
// Check COmponen
const kerndir = dirli.kernel;
for (const i in kerndir.file) {
    if (fs.existsSync(`src/${kerndir.dir}${kerndir.file[i]}`)) {
        console.info(`FIle ${kerndir.file[i]} Exist`);
    }
    else {
        console.error(`File ${kerndir.file[i]} not found`);
        console.error(`Repairing ${kerndir.file[i]}`);
        getRemoteFile(`${kerndir.file[i]}`, 'kernel/');
    }
}
const utilsdur = dirli.utils;
for (const i in utilsdur.file) {
    if (fs.existsSync(`src/${utilsdur.dir}${utilsdur.file[i]}`)) {
        console.info(`FIle ${utilsdur.file[i]} Exist`);
    }
    else {
        console.error(`File ${utilsdur.file[i]} not found`);
        console.error(`Repairing ${utilsdur.file[i]}`);
        getRemoteFile(`${utilsdur.file[i]}`, 'kernel/');
    }
}


// Function
function getRemoteFile(file, location) {
    const localFile = fs.createWriteStream(`src/${location}/${file}`);
    console.log(`Downloading ${file}`);
    http.get(`${link}/src/${location}${file}`, function (response) {
        response.on('end', function () {
            console.log('Download complete');
        });

        response.pipe(localFile);
    });
}