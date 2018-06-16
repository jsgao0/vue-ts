const fs = require('fs')
const path = require('path')
const arg = process.argv.slice(2)
const src = path.resolve(arg[0])
const exist = (filePath) => {
  try {
    fs.accessSync(filePath)
    return true
  } catch (e) {
    return false
  }
}
const deleteFolderRecursive = (filePath) => {
  if (exist(filePath)) {
    fs.readdirSync(filePath).forEach((file, index) => {
      const curPath = `${filePath}/${file}`
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(filePath)
  }
}
deleteFolderRecursive(src)
