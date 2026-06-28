const nh = require("../bridge"); // node-haxball-headless-wrapper

nh(({ HBInit, API }) => {
    const room = HBInit({
        roomName: 'node-haxball bridge',
        maxPlayers: 12,
        token: 'thr1.AAAAAGpBY1Y3x0ZOpFbLoA.aSYcoSrDxNM',
        public: true
    });
    const welcomerInstance = new welcomerPlugin(API);
    room.nhInstance.addPlugin(welcomerInstance);

    room.onRoomLink = (link) => {
        console.log(link);
    }
});

function welcomerPlugin(API) {
    const { AllowFlags, Plugin, Utils } = API;

    Object.setPrototypeOf(this, Plugin.prototype);
    Plugin.call(this, 'welcomer', true);

    const that = this;

    this.onPlayerJoin = (playerObj) => {
        that.room.sendAnnouncement("Welcome!!!!!!");
    }
}