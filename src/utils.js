import {createRequire} from "module";

const require = createRequire(import.meta.url);
const fs = require('fs')

const DEBUG = true
const appRootPath = require('app-root-path').path
const zipTargetPath = appRootPath + "\\dist.zip"
const configPath = appRootPath + '\\nsd_app_uploader.json'

function getConfigFile() {
    let configFile
    if (fs.existsSync(configPath)) {
        try {
            configFile = require(configPath)
        } catch (e) {
            throw new Error("Не удалось найти конфигурационный файл: " + e)
        }
    }
    return configFile
}

export {
    DEBUG,
    require,
    appRootPath,
    zipTargetPath,
    getConfigFile
}
