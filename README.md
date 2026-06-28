# node-haxball-headless-bridge

A compatibility bridge for running bots originally written for **haxball.js** or **Haxball Headless Host** ready to run directly with **node-haxball** with minimal code changes.

Instead of rewriting your existing bot, `node-haxball-headless-bridge` exposes a familiar API while using `node-haxball` under the hood.

## Features

* Simple setup.
* Compatible with existing haxball.js/headless bot structure.
* Uses `node-haxball` internally.
* Helps migrate existing projects without major rewrites.

## Installation

```bash
npm install node-haxball-headless-bridge
```

## Usage

```js
const initBridge = require("node-haxball-headless-bridge");

initBridge(({ HBInit, API }) => {
    const room = HBInit({
        roomName: "My Room",
        maxPlayers: 16,
        public: false
    });

    room.onPlayerJoin = (player) => {
        console.log(`${player.name} joined.`);
    };
});
```

## How it works

Normally, using `node-haxball` requires initializing the API and creating the headless wrapper manually:

```js
const initNh = require("node-haxball");
const headlessWrapper = require("node-haxball/src/headlessWrapper");

const API = initNh();
const { HBInit } = headlessWrapper(API);
```

`node-haxball-headless-bridge` handles this setup for you:

```js
const initBridge = require("node-haxball-headless-bridge");

initBridge(({ HBInit, API }) => {
    // Ready to use
});
```

## Examples

See the `examples/` directory for complete examples.

## Why use this?

If you have an existing bot built with **haxball.js** or **Haxball Headless Host**, this package provides an easy migration path to **node-haxball**, allowing you to keep most of your existing code while taking advantage of `node-haxball`'s implementation.

## Accessing the native `node-haxball` room

Every room created through `HBInit` also exposes the underlying `node-haxball` room instance through:

```js
room.nhInstance
```

This gives you direct access to the `node-haxball` API functionalities such as native [callbacks](https://github.com/wxyz-abcd/node-haxball/wiki/uncategorized-commonEventCallbacks) (onCollisionDiscVsSegment, modifyPlayerData, onTeamColorsChange, etc), [methods](https://github.com/wxyz-abcd/node-haxball/wiki/interfaces-room) (setProperties, addIpBan, addAuthBan, etc), enums etc.

### ⚠️ Important

`node-haxball-headless-bridge` relies on the [Headless Wrapper](https://github.com/wxyz-abcd/node-haxball/blob/main/src/headlessWrapper.js) to translate Headless callbacks into `node-haxball` events.

Because of this, **do not replace the room configuration or assign native callbacks directly**.

**Do NOT do any of the following:**

```js
room.nhInstance.setConfig(...);

room.nhInstance.onPlayerJoin = ...;
room.nhInstance.onPlayerLeave = ...;
room.nhInstance.onPlayerChat = ...;
room.nhInstance.onPlayerBallKick = ...;
room.nhInstance.onGameStart = ...;
room.nhInstance.onGameStop = ...;
room.nhInstance.onGameTick = ...;

// ...or any other native node-haxball callback that already exists
// in the RoomConfig.
```

Doing so may overwrite the callbacks installed by the Headless Wrapper, causing Headless events to stop working correctly or behave unexpectedly.

### Running native callbacks

If you need to run native callbacks that already exist in the underlying `RoomConfig`, use:

```js
room.nhInstance.mixConfig({
    // your callbacks
});
```

`mixConfig()` does **not** replace existing callbacks. Instead, it appends your callback functions to the existing callback stack for each event. When that event is triggered, all registered callback functions are executed one after another.

This allows your native `node-haxball` callbacks to coexist with the callbacks installed by `node-haxball-headless-bridge`.

> **Warning:** `mixConfig()` is a **one-way operation**. Once a configuration has been mixed into the room, it **cannot be undone or removed**. Any callbacks added through `mixConfig()` will remain registered for the lifetime of that room.

## License

MIT
