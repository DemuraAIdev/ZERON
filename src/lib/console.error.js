console.old_error = console.error;
console.error = function () {
    return console.old_error('\x1b[31m', 'Error', '\x1b[0m', ...arguments, '\x1b[0m');
};

module.exports = console.error;
