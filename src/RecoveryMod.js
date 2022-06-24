const fs = require('fs');
const http = require('https');
const link = 'https://github.com/DemuraAIdev/ZERON';

console.clear();
console.info('Entering Auto Repair System');
console.info('Downloading latest version of Auto Repair System');
getRemoteFile('RecoveryMod.js', link + '/');


function getRemoteFile(file, url) {
    const localFile = fs.createWriteStream('src/temp/' + file);
    http.get(url, function (response) {
        response.on('end', function () {
            console.log('Download complete');
        });

        response.pipe(localFile);
    });
}