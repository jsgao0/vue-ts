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
app.use(express.json()).use(corsHandler)
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

const types = {
  Object: 1,
  Array: 2,
  Number: 3,
  Boolean: 4,
  String: 5,
  Undefined: 6,
  Error: 7,
}

const getType = (val) => {
  switch (typeof val) {
    case 'object':
      if (Array.isArray(val)) {
        return types.Array
      } else {
        return types.Object
      }
    case 'number':
      return types.Number
    case 'boolean':
      return types.Boolean
    case 'string':
      return types.String
    case 'undefined':
      return types.Undefined
    default:
      return types.Error
  }
}

const typeCheck = ({ val, expect }) => {
  const result = getType(expect) === getType(val)
  if (result) {
    switch (getType(expect)) {
      case [types.Object]:
        return Object.keys(expect).every((e) =>
          typeCheck({ expect: expect[e], val: val[e] }),
        )
      case [types.Array]:
        return expect.every((e) =>
          typeCheck({ expect: expect[e], val: val[e] }),
        )
      default:
        return result
    }
  } else {
    return result
  }
}

const checkReqFn = ({ vals, expects }) => {
  return Object.keys(expects).every((e) =>
    typeCheck({ expect: expects[e], val: vals[e] }),
  )
}

const resFn = (req, res, method, filePath) => {
  const result =
    method === 'get'
      ? checkReqFn({
          vals: req.query,
          expects: JSON.parse(fs.readFileSync(`${filePath}/req.json`, 'utf8')),
        })
      : checkReqFn({
          vals: req.body,
          expects: JSON.parse(fs.readFileSync(`${filePath}/req.json`, 'utf8')),
        })
  if (result) {
    res.json(JSON.parse(fs.readFileSync(`${filePath}/success.json`, 'utf8')))
  } else {
    res.json(JSON.parse(fs.readFileSync(`${filePath}/fail.json`, 'utf8')))
  }
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

Object.keys(apiFolders).forEach((e) => {
  generateAPI(apiFolders[e], e)
})

app.listen(apiPort)
console.log('running', `http://localhost:${apiPort}`)
