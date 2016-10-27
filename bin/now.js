#!/usr/bin/env node

// Native
import {resolve} from 'path'

// Packages
import minimist from 'minimist'
import {spawn} from 'cross-spawn'

// Ours
import checkUpdate from '../lib/check-update'

const argv = minimist(process.argv.slice(2))

// options
const debug = argv.debug || argv.d

// auto-update checking
const update = checkUpdate({debug})

const exit = code => {
  update.then(() => process.exit(code))
  // don't wait for updates more than a second
  // when the process really wants to exit
  setTimeout(() => process.exit(code), 1000)
}

const defaultCommand = 'deploy'

const commands = new Set([
  defaultCommand,
  'help',
  'list',
  'ls',
  'rm',
  'remove',
  'alias',
  'aliases',
  'ln',
  'domain',
  'domains',
  'cert',
  'certs',
  'secret',
  'secrets',
  'static'
])

const aliases = new Map([
  ['ls', 'list'],
  ['rm', 'remove'],
  ['ln', 'alias'],
  ['aliases', 'alias'],
  ['domain', 'domains'],
  ['cert', 'certs'],
  ['secret', 'secrets']
])

let args = process.argv.slice(2)
let cmd = defaultCommand

let cmdIndex
console.log('HELLO')
for (const [index, arg] of args.entries()) {
  console.log('TESTING:', arg)
  if (commands.has(arg)) {
    console.log('CMD FOUND:', arg, 'INDEX:', index)
    cmd = arg
    args.splice(index, 1)

    if (arg === 'help') {
      if (index + 1 < args.length && commands.has(args[index + 1])) {
        cmd = args[index + 1]
        args.splice(index, 2)
      } else {
        cmd = defaultCommand
        args.splice(index, 1)
      }

      args.unshift('--help')
    } else {
      cmd = arg
      args.splice(index, 1)
    }

    break
  }
}

// let cmd = argv._[0]
// let args = []
//
// if (cmd === 'help') {
//   cmd = argv._[1]
//
//   if (!commands.has(cmd)) {
//     cmd = defaultCommand
//   }
//
//   args.push('--help')
// }
//
// if (commands.has(cmd)) {
//   cmd = aliases.get(cmd) || cmd
//   args = args.concat(process.argv.slice(3))
// } else {
//   cmd = defaultCommand
//   args = args.concat(process.argv.slice(2))
// }

let bin = resolve(__dirname, 'now-' + cmd)
if (process.pkg) {
  args.unshift('--entrypoint', bin)
  bin = process.execPath
}

console.log('CMD:', bin)
console.log('ARGS:', args)
//
//
// const proc = spawn(bin, args, {
//   stdio: 'inherit',
//   customFds: [0, 1, 2]
// })
//
// proc.on('close', code => exit(code))
// proc.on('error', () => exit(1))
