const initNh = require("node-haxball");
const headlessWrapper = require("node-haxball/src/headlessWrapper");

module.exports = function (callback, nhParams = {}) {
    const API = initNh(nhParams);
    const { Utils } = API;
    const { HBInit } = headlessWrapper(API);
    callback({
        HBInit,
        API
    });
};