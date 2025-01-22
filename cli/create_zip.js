#!/usr/bin/env node

import {appRootPath, require, configFile, zipTargetPath, debug} from './../src/utils.js'
import {DEFAULT_SOURCE_DIR_PATH, DEFAULT_EXCLUDED_FILES} from "../src/constants.js"

const fs = require('fs')
const archiver = require('archiver')
const path = require('path')

if (fs.existsSync(zipTargetPath)) {
    console.log('Удаление существующего архива')
    fs.unlinkSync(zipTargetPath)
    console.log('Файл успешно удалён')
}

let sourceDirPath = DEFAULT_SOURCE_DIR_PATH
if (configFile?.sourceDirPath) sourceDirPath = configFile.sourceDirPath
const distPath = path.join( appRootPath,  sourceDirPath)

console.log("Архивация файлов из директории:")
console.log(distPath)

const output = fs.createWriteStream(zipTargetPath)
const archive = archiver("zip", {zlib: {level: 9}})

output.on("close", () => console.log(archive.pointer() + " байтов заархивировано."))
archive.on("error", (err) => {
    throw err
})
archive.on("warning", function (err) {
    if (err.code === "ENOENT") console.log(err)
    else throw err
})

let filesToArchive = fs.readdirSync(distPath)

archive.pipe(output)

let excludedFiles = DEFAULT_EXCLUDED_FILES
if (configFile?.excludedFiles) excludedFiles = configFile.excludedFiles
if (configFile?.addExcludedFiles) configFile.addExcludedFiles.forEach((file) => {
    excludedFiles.push(file)
})

filesToArchive.forEach((file) => {
    if (debug) console.log(`Работаю с файлом: ${file}`)
    if (!excludedFiles.includes(file)) {
        if (debug) console.log(`Файл не в исключении`)
        const filePath = path.join(distPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) archive.file(filePath, {name: file})
        else if (stat.isDirectory()) archive.directory(filePath, file)
    } else if (debug) console.log(`Файл в исключении`)
})

archive.finalize()

console.log("Архивация завершена.")
