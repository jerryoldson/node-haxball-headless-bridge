const nh = require("../bridge"); // node-haxball-headless-wrapper

nh(({ HBInit, API }) => {
    const room = HBInit({
        roomName: 'node-haxball bridge',
        maxPlayers: 12,
        token: 'thr1.AAAAAGpBcZsG9aHMkHVobg.HMZo5p7KYH8',
        public: true
    });

    room.onRoomLink = (link) => {
        console.log(link);
        anticloner(API, room);
    }
});

function anticloner(API, room) {
    const { Utils } = API;
    const roomId = room.nhInstance.link.split('?c=').pop().split('&')[0];
    var baseLat = room.nhInstance.geo.lat;
    var baseLon = room.nhInstance.geo.lon;

    // argentina limits
    const LAT_MIN = -34.567;
    const LAT_MAX = -34.47716888250090;
    const LON_MIN = -58.467123131;
    const LON_MAX = -58.35803372899370;

    // check if a room is near ours
    const isRoomNear = (room, targetLat, targetLon, range = 0.01) => {
        const distance = Math.sqrt(
            Math.pow(room.data.lat - targetLat, 2) +
            Math.pow(room.data.lon - targetLon, 2)
        );
        return distance <= range;
    };

    // generate random geo inside the limits
    const generateRandomGeo = () => ({
        lat: LAT_MIN + Math.random() * (LAT_MAX - LAT_MIN),
        lon: LON_MIN + Math.random() * (LON_MAX - LON_MIN),
    });

    const runAntiCloner = () => {
        // get haxball room list
        Utils.getRoomList().then((list) => {
            // ignore our own room
            const roomsToCheck = list.filter(r => r.id !== roomId);

            // analyze all room list
            const nearRooms = roomsToCheck.filter(r => isRoomNear(r, baseLat, baseLon));

            if (nearRooms.length >= 1) {
                // update new geo and apply it to the room
                const newGeo = generateRandomGeo();
                baseLat = newGeo.lat;
                baseLon = newGeo.lon;
                room.nhInstance.setProperties({
                    geo: newGeo
                });
                console.log('Nearby rooms found -> Generating random geo');
            } else {
                console.log('No nearby rooms -> Keeping original geo');
            }
        })
    }

    setInterval(runAntiCloner, 300000) // analyze for room cloners each 5 minutes
}