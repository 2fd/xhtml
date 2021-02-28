#!/usr/bin/env node
import { createInterface } from 'readline'
import yargs from 'yargs'
import $ from 'cherio'
import log from './log'

const pkg = require('../package.json')

let data = ""
const cli = yargs(process.argv.slice(2))
  .version(pkg.version)
  .usage('$0 ' + pkg.description)
  .option('no-color', { description: 'disable output colors', boolean: true  })
  .option('depth', { alias: 'd', description: 'html traverse limit', number: true  })
  .option('selector', { alias: 's', description: 'css selector filter', string: true  })
  .help()

const options = cli.argv

// exit when note data
setTimeout(() => {
  if (data === "") {
    console.log()
    cli.showHelp()
    console.log()
    process.exit(0)
  }
}, 300)

createInterface(process.stdin)
  .on('line', (line) => { data += line })
  .on('close', () => {
    data = data.trim()
    let items = 0
    const isSVG = data.startsWith('<svg') && data.endsWith('</svg>')
    const selector = options.selector ?? (isSVG ? 'svg' : 'html')

    $.load(data)(selector)
      .each((_: number, el: any) => {
        items++
        log(el, {
          prefix: '',
          depth: options.depth ?? Infinity,
          color: !!(options.color ?? true)
        })
      })

    if (items === 0) {
      console.log('No content')
    }
  });
