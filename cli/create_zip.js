#!/usr/bin/env node

import {appRootPath, require, getConfigFile, zipTargetPath} from './../src/utils.js'
const fs = require('fs')
const archiver = require('archiver')

if(fs.existsSync(zipTargetPath)) {
    console.log('Удаление существующего архива')
    fs.unlinkSync(zipTargetPath)
    console.log('Файл успешно удалён')
}

const configFile = getConfigFile()
let sourceDirPath =  '\\'
if(configFile?.sourceDirPath) sourceDirPath = configFile.sourceDirPath
const distPath =  appRootPath + sourceDirPath

console.log("Архивация файлов из директории:")
console.log(distPath)
console.log("Целевое местоположение архива:")
console.log(zipTargetPath)
const output = fs.createWriteStream(zipTargetPath)
const archive = archiver("zip", {zlib: {level: 9}})

output.on("close",  () => console.log(archive.pointer() + " байтов заархивировано."))
archive.on("error", (err) => {throw err})
archive.on("warning", function (err) {
    if (err.code === "ENOENT") console.log(err)
    else throw err
})

archive.pipe(output)
archive.directory(distPath, false)
archive.finalize()

console.log("Архивация завершена.")
