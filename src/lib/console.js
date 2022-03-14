console.old_info = console.info;
console.old_error = console.error;
console.old_warn = console.warn;

console.info = function () {
    return console.old_info('\x1b[34m', 'Info', '\x1b[0m', ...arguments, '\x1b[0m');
};
console.error = function () {
    return console.old_error('\x1b[31m', 'Error', '\x1b[0m', ...arguments, '\x1b[0m');
};
console.warn = function () {
    return console.old_warn('\x1b[33m', 'Warn', '\x1b[0m', ...arguments, '\x1b[0m');
};

module.exports = console.info, console.error, console.warn;
