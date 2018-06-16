const path = require('path')
const packageJson = require('../package.json')
const tsConfig = require('../tsconfig.json')

const alias = {}
Object.keys(tsConfig.compilerOptions.paths).map((e) => {
  const val = `${tsConfig.compilerOptions.baseUrl}${
    tsConfig.compilerOptions.paths[e][0]
  }`
  alias[e.substr(0, e.length - 2)] = path.resolve(val.substr(0, val.length - 1))
})
const ecma = Number(tsConfig.compilerOptions.target.substr(2))
const { baseHref, jsPath, buildFolder } = packageJson.config
const { name } = packageJson
module.exports = {
  baseHref,
  alias,
  ecma,
  name,
  jsPath,
  buildFolder,
}
