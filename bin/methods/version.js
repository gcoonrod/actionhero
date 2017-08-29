'use strict'

const path = require('path')
const packageJSON = require(path.join(__dirname, '/../../package.json'))

module.exports = {
  name: 'version',
  description: 'return the ActionHero version within this project',

  run: function (api, data) {
    console.log(packageJSON.version)
    return true
  }
}
