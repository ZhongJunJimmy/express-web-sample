let fs = require("fs")

let express = require("express")
//載入express模組
let engine = require("ejs-locals")
//載入ejs-locals 模組
let app = express()
// Stream = require("node-rtsp-stream")
// stream = new Stream({
//     name: "",
//     streamUrl: "rtsp://37.157.51.30/axis-media/media.amp", //rtsp url
//     wsPort: 9999,
//     ffmpegOptions: {
//         // options ffmpeg flags
//         "-stats": "", // an option with no neccessary value uses a blank string
//         "-r": 30, // options with required values specify the value after the key
//     },
// })
// 使用express
app.engine("ejs", engine)
app.use("/static", express.static(__dirname + "/public"))
app.set("views", "./views")
app.set("view engine", "ejs")
app.get("/", function (req, res) {
    
    res.render("index", {
        title: "Index",
        subtitle: "單圖顯示",
        description: "Show a local photo in page.",
        img: "static/img/ghibli/chihiro007.jpg",
    })
})
app.get("/product", function (req, res) {
    var imageFolder = __dirname + "/public/img/ghibli"
    var images = []
    fs.readdirSync(imageFolder).forEach((fileName) => {
        images.push(`static/img/ghibli/${fileName}`)
    })
    console.log(images)
    res.render("product", {
        title: "Multi Photo",
        subtitle: "多圖顯示",
        description: `Show multi photo from local files in page.`,
        img: images,
    })
})
app.get("/about", function (req, res) {
    res.render("about", {
        title: "RTSP Stream",
        subtitle: "RTSP串流播放",
        description: `Play video from RTSP stream in page.`,
    })
})

app.get("/video", function (req, res) {
    res.render("video", {
        title: "Video",
        subtitle: "影片",
        description: `Play video from local files in page.`,
    })
})


app.get("/test", function (req, res) {
    console.log(req.query)
    res.render("video", {
        title: req.query.a,
        subtitle: "影片",
        description: `Play video from local files in page.`,
    })
})

app.get("/test2", function (req, res) {
    console.log(req.query)
    req.query.datetime
})

app.get("/displayVideo", function (req, res) {
    var range = req.headers.range
    console.log(req.headers)
    if (!range) {
        //res.status(400).send("Requires Range header")
        //range = "200-1000"
    }
    const videoPath = __dirname + "/public/video/video2.avi"
    const videoSize = fs.statSync(videoPath).size
    const CHUNK_SIZE = 10 ** 6
    const start = Number(range.replace(/\D/g, ""))
    console.log(start)
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1)
    console.log(end)
    const contentLength = end - start + 1
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/x-msvideo",
    }
    res.writeHead(206, headers)
    const videoStream = fs.createReadStream(videoPath, { start, end })
    videoStream.pipe(res)
})

let port = 3000
//設定port位置
app.listen(port)
// 監聽 port
