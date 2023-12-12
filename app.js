let fs = require("fs")

let express = require("express")
//載入express模組
let engine = require("ejs-locals")
//載入ejs-locals 模組
let app = express()
// 使用express
app.engine("ejs", engine)
app.use("/static", express.static(__dirname + "/public"))
app.set("views", "./views")
app.set("view engine", "ejs")
app.get("/", function (req, res) {
    res.render("index", {
        title: "Index",
        subtitle: "首頁",
        description: "This is index page",
        img: "static/img/ghibli/chihiro007.jpg",
    })
})
app.get("/product", function (req, res) {
    var imageFolder = __dirname + "/public/img/ghibli"
    var images = []
    fs.readdirSync(imageFolder).forEach((fileName) => {
        images.push(`static/img/ghibli/${fileName}`)
    })
    // console.log(images)
    res.render("product", {
        title: "Products",
        subtitle: "產品介紹",
        description: `Something short and leading about the collection below—its contents, the creator, etc.Make it short and sweet, but not too short so folks don’ t simply skip over it entirely.`,
        img: images,
    })
})
app.get("/about", function (req, res) {
    res.render("about", {
        title: "About",
        subtitle: "產品介紹",
        description: `Something short and leading about the collection below—its contents, the creator, etc.Make it short and sweet, but not too short so folks don’ t simply skip over it entirely.`,
    })
})

let port = 3000
//設定port位置
app.listen(port)
// 監聽 port
