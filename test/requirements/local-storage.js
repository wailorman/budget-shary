module.exports = typeof window == 'undefined' ? require('localStorage') : window.localStorage;
