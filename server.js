const express = require('express')
const app = express()
const packageJson = require('./package.json')
const pubicPath = packageJson.config.buildFolder
const webPort = packageJson.config.server.port
const { route } = require('./route.json')
app
  .use('/assets', express.static(`${pubicPath}/assets`))
  .use('/js', express.static(`${pubicPath}/js`))
  .use('/css', express.static(`${pubicPath}/css`))
  .use('/api', express.static(`${pubicPath}/api`))
route.forEach((e) => {
  app.get(e.path, (req, res) => {
    res.sendFile(`${__dirname}/${pubicPath}${e.html}`)
  })
})
app.listen(webPort)

console.log('running', `http://localhost:${webPort}`)
