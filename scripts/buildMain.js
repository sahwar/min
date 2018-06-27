const path = require('path')
const fs = require('fs')

const outFile = path.resolve(__dirname, '../main.build.js')

// build localization support first, since it is included in the bundle
require('./buildLocalization.js')()

const modules = [
  'dist/localization.build.js',
  'main/main.js',
  'main/filtering.js'
]

function buildMain () {
  /* concatenate modules */
  let output = ''
  modules.forEach(function (script) {
    output += fs.readFileSync(path.resolve(__dirname, '../', script)) + ';\n'
  })

  fs.writeFileSync(outFile, output, 'utf-8')
}

if (module.parent) {
  module.exports = buildMain
} else {
  buildMain()
}
