const yaml = require("js-yaml");
const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

let configFile = "config.local.yaml";

const argv = yargs(hideBin(process.argv)).argv;

if (argv.config != undefined) {
  configFile = argv.config;
}
const config = yaml.load(fs.readFileSync(configFile, "utf8"));

module.exports = { config };
