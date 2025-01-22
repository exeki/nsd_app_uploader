#!/usr/bin/env node

import {zipTargetPath, require, configFile, debug} from './../src/utils.js'
import {DEFAULT_SCHEME} from '../src/constants.js'

const fs = require('fs')
const axios = require('axios')
const https = require('https')

if (!configFile) throw new Error("Отправка файла без конфигурационного файла невозможна.")

const host = configFile.host
if (host === undefined || host == null || host?.length === 0) throw new Error("В конфигурационном файле не указан host.")
const accessKey = configFile.accessKey
if (accessKey === undefined || accessKey == null || accessKey?.length === 0) throw new Error("В конфигурационном файле не указан accessKey.")
const code = configFile.code
if (code === undefined || code == null || code?.length === 0) throw new Error("В конфигурационном файле не указан code.")

let scheme = DEFAULT_SCHEME
if (configFile.scheme) scheme = configFile.scheme
console.log(`Начало отправки файла на инсталляцию ${configFile.host}`)

const url = `${scheme}://${host}/sd/services/smpsync/ea?accessKey=${accessKey}`

const formData = new FormData()
formData.append('title', configFile.title ?? code)
formData.append('code', code)
formData.append('minHeight', configFile.minHeight ?? 1000)
formData.append('turnOff', configFile.turnOff ?? false)
console.log(`Чтение файла ` + zipTargetPath)
const fileBuffer = fs.readFileSync(zipTargetPath)
const blob = new Blob([fileBuffer])
formData.append('file', blob, Math.floor(Date.now() / 1000).toString() + '.zip')
if (debug) console.log(url)
if (debug) console.log(formData)
console.log(`Отправка файла`)
let disableSll = false
if(configFile.disableSll !== undefined) disableSll = configFile.disableSll
const agent = new https.Agent({
    rejectUnauthorized: !disableSll
})
axios.post(url, formData, {httpAgent: agent, httpsAgent: agent})
    .then(response => console.log(response.data))
    .catch(error => console.log("Ошибка при загрузке приложения: " + error))
