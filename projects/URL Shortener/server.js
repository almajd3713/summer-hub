
let express = require("express")
let app = express()
let bodyParser =  require("body-parser")
let port = process.env.PORT || 3000

let fs = require("fs")
let database = JSON.parse(fs.readFileSync("./database.json", "utf-8"))

app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.urlencoded({extended: false}))

let idGen = () => (new Date * Math.random()).toString(36).substring(0, 6)

app.get("/", (req, res) => {
  res.sendFile()
})
app.get("/:id", (req, res) => {
  let desiredUrl = database.find(urlPair => urlPair.id === req.params.id)
  if(desiredUrl) {
    res.redirect(desiredUrl.url)
  } else {
    res.status(404)
    res.sendFile(`${__dirname}/public/view.html`)
  }
})
app.get("/check/:id", (req, res) => {
  let desiredUrl = database.find(urlPair => urlPair.id === req.params.id)
  if(desiredUrl) {
    res.status(200)
    res.send({url: desiredUrl.url})
  } else {
    res.status(404)
    res.send({err: "no url associated with given id"})
  }
})
app.get("/view/:id", (req, res) => {
  res.type("html")
  res.sendFile(`${__dirname}/public/view.html`)
})

app.post("/postUrl", (req, res) => {
  let urlId = idGen()
  database.push({
    id: urlId,
    url: req.body.urlToShorten
  })
  fs.writeFile("./database.json", JSON.stringify(database), () => {})
  res.redirect(`/view/${urlId}`)
})
// for(let i = 0; i < 10; i++){
//   console.log(idGen())
// }

app.listen(port, () => console.log("server has started !"))