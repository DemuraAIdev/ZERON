console.old_warn = console.warn;
console.warn = function () {
    return console.old_warn('\x1b[33m', 'Warn', '\x1b[0m', ...arguments, '\x1b[0m');
};
module.exports = console.warn;
