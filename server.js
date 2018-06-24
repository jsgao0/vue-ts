const express = require('express')
const app = express()
const config = require('./config.json')
const pubicPath = config.buildFolder
const webPort = config.server.port
const { route } = require('./route.json')
app
  .use('/assets', express.static(`${pubicPath}/assets`))
  .use('/js', express.static(`${pubicPath}/js`))
  .use('/css', express.static(`${pubicPath}/css`))
  .use('/manifest.json', express.static(`${pubicPath}/manifest.json`))
route.forEach((e) => {
  app.get(e.path, (req, res) => {
    res.sendFile(`${__dirname}/${pubicPath}${e.html}`)
  })
})
app.listen(webPort)

console.log('running', `http://localhost:${webPort}`)