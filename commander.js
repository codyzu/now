const program = require('commander')

program
  .allowUnknownOption()
  .version('0.0.1')
  .option('-f, --force', 'force it')

program
  .command('deploy')
  .description('deploy something')
  .action(command)

program
  .command('list')
  .alias('ls')
  .description('lists deployments')
  .action(command)

program
  .command('remove')
  .alias('rm')
  .description('remove deployments')
  .action(command)


let args = process.argv.slice(2)
const commands = new Set(['help', 'deploy', 'list', 'ls', 'rm', 'remove']);

let cmd = ['deploy']

for (const [index, arg] of args.entries()) {
  if (commands.has(arg)) {
    if (arg === 'help') {
      if (index + 1 < args.length && commands.has(args[index + 1])) {
        cmd = [args[index + 1], '-h']
        args.splice(index, 2)
      } else {
        cmd = ['deploy', '-h']
        args.splice(index, 1)
      }
    } else {
      cmd = [arg]
      args.splice(index, 1)
    }

    break
  }
}

console.log('CMD:', cmd)
console.log('ARGS:', args)
const argsToParse = [...process.argv.slice(0, 2), ...cmd, ...args]

console.log('NEW ARGS:', argsToParse)

program.parse(argsToParse)

function command (cmd, options) {
  console.log('CMD:', cmd)
  console.log('OPTIONS:', options)
}

console.log('DONE')
