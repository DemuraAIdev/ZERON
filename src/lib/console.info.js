console.old_info = console.info;
console.info = function () {
    return console.old_info('\x1b[34m', 'Info', '\x1b[0m', ...arguments, '\x1b[0m');
};
module.exports = console.info;
