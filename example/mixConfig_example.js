const nh = require("../bridge");

nh(({ HBInit, API }) => {
    const room = HBInit({
        roomName: 'node-haxball bridge',
        maxPlayers: 12,
        token: 'thr1.AAAAAGpA6K-I1Wju6XkDCg.c_9xLYqmlR0',
        public: true
    });

    room.onRoomLink = (link) => {
        console.log(link)
    };

    // native node-haxball callbacks
    room.nhInstance.mixConfig({
        onPlayerJoin = (playerObj) => {
            // whatever you want
        },
    })
});