
import * as express from "express"

let port = process.env.PORT || 3000

let app = express()
app.use(express.static(`${__dirname}/public`))

app.get("/", (req, res) => {
  // @ts-ignore
  res.sendFile()
})

app.listen(port, () => console.log("server has started !"))