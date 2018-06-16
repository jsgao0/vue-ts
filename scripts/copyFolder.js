const fs = require('fs')
const path = require('path')
const arg = process.argv.slice(2)
const src = path.resolve(arg[0])
const dist = path.resolve(arg[1])
const exist = (filePath) => {
  try {
    fs.accessSync(filePath)
    return true
  } catch (e) {
    return false
  }
}
if (!exist(dist)) {
  fs.mkdirSync(dist)
}
const copyFolderRecursive = (filePath) => {
  if (exist(filePath)) {
    fs.readdirSync(filePath).forEach((file, index) => {
      const curPath = `${filePath}/${file}`
      const distPath = `${dist}/${file}`
      if (fs.lstatSync(curPath).isDirectory()) {
        fs.mkdirSync(distPath)
        copyFolderRecursive(curPath)
      } else {
        fs.writeFileSync(distPath, fs.readFileSync(curPath))
      }
    })
  }
}
copyFolderRecursive(src)
