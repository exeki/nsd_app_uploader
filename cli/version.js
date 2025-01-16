#!/usr/bin/env node

import { require } from "./../src/utils.js";
const packageJson = require("./../package.json");

console.log("nsd_app_uploader:")
console.log(packageJson.version);
