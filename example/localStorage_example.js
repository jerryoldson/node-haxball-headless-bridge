/*

You can use this example as an entry point
to browser projects that use localStorage.

As node.js has no native localStorage, we have to install
and use a npm package called node-localstorage,
a drop-in substitute for the browser native localStorage API that runs on node.js.

*/
const nh = require("../bridge"); // node-haxball-headless-wrapper
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


nh(({ HBInit, API }) => {
    const room = HBInit({
        roomName: 'node-haxball bridge',
        maxPlayers: 12,
        token: 'thr1.AAAAAGpA6K-I1Wju6XkDCg.c_9xLYqmlR0',
        public: true
    });

    room.onRoomLink = (link) => {
        console.log(link);
    }

    room.onPlayerJoin = (link) => {
        // whatever you want to do with localStorage when a player joins
    }
});