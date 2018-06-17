const express = require('express')
const path = require('path')
const fs = require('fs')
const config = require('./config.json')

const app = express()
const webPort = config.server.port
const apiPort = config.fakeAPI.port
const { main } = config.fakeAPI
const fakeFolder = config.fakeAPI.folder

const corsHandler = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `http://localhost:${webPort}`)
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, OPTIONS, PUT, DELETE, PATCH',
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, X-CSRF-TOKEN, X-XSRF-TOKEN',
  )
  next()
}
app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(corsHandler)
const exist = (filePath) => {
  try {
    fs.accessSync(filePath)
    return true
  } catch (e) {
    return false
  }
}
const apiFolders = {
  get: path.resolve(`${fakeFolder}/get`),
  post: path.resolve(`${fakeFolder}/post`),
  put: path.resolve(`${fakeFolder}/put`),
  patch: path.resolve(`${fakeFolder}/patch`),
  delete: path.resolve(`${fakeFolder}/delete`),
}

const resFn = (req, res, method, filePath) => {
  console.log(method, req.query, req.body)
  res.json(JSON.parse(fs.readFileSync(`${filePath}/success.json`, 'utf8')))
}
const generateAPI = (filePath, method) => {
  if (exist(filePath)) {
    fs.readdirSync(filePath).forEach((file, index) => {
      const curPath = `${filePath}/${file}`
      if (fs.lstatSync(curPath).isDirectory()) {
        generateAPI(curPath, method)
      } else {
        const apiPath = filePath.replace(
          path.resolve(`${fakeFolder}/${method}`),
          '',
        )
        if (file.toLowerCase() === 'req.json') {
          switch (method) {
            case 'get':
              app.get(`${main}${apiPath}`, (req, res) => {
                resFn(req, res, method, filePath)
              })
              break
            case 'post':
              app.post(`${main}${apiPath}`, (req, res) => {
                resFn(req, res, method, filePath)
              })
              break
            case 'delete':
              app.delete(`${main}${apiPath}`, (req, res) => {
                resFn(req, res, method, filePath)
              })
              break
            case 'put':
              app.put(`${main}${apiPath}`, (req, res) => {
                resFn(req, res, method, filePath)
              })
              break
            case 'patch':
              app.patch(`${main}${apiPath}`, (req, res) => {
                resFn(req, res, method, filePath)
              })
              break
          }
        }
      }
    })
  }
}
for (let i in apiFolders) {
  if (apiFolders.hasOwnProperty(i)) {
    generateAPI(apiFolders[i], i)
  }
}
app.listen(apiPort)
console.log('running', `http://localhost:${apiPort}`)
