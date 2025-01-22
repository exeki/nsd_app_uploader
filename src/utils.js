import {createRequire} from "module";
import {DEFAULT_ZIP_PATH, CONFIG_FILE_PATH, DEBUG} from "./constants.js"

const require = createRequire(import.meta.url);
const fs = require('fs')
const path = require('path')
const appRootPath = require('app-root-path').path

const zipTargetPath = path.join(appRootPath, DEFAULT_ZIP_PATH)

let configFile
let debug = DEBUG

const configPath = path.join(appRootPath, CONFIG_FILE_PATH)
if (fs.existsSync(configPath)) {
    try {
        const content = fs.readFileSync(configPath)
        configFile = JSON.parse(content.toString())
        if(configFile.debug !== undefined) debug = configFile.debug
        if (debug) console.log(`Конфигурационный файл прочитан`)
    } catch (e) {
        throw new Error("Не удалось прочитать конфигурационный файл: " + e)
    }
} else if (debug) console.log(`Конфигурационный файл не существует по пути: ${configPath}`)

export {
    require,
    appRootPath,
    zipTargetPath,
    debug,
    configFile
}
