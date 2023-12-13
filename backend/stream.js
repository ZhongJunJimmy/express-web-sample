Stream = require("node-rtsp-stream")
stream = new Stream({
    name: "",
    streamUrl: "rtsp://77.110.228.219/axis-media/media.amp", //rtsp url
    wsPort: 9999,
    ffmpegOptions: {
        // options ffmpeg flags
        "-stats": "", // an option with no neccessary value uses a blank string
        "-r": 30, // options with required values specify the value after the key
    },
})
