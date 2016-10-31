import test from 'ava'
import {spawn} from 'cross-spawn'
import {join} from 'path'

test.cb('dsafdf', t => {
  // t.plan(1)
  // const command = path.join(__dirname, '../bin/now')
  // const command = 'pwd'
  const command = 'node'
  const args = ['-r', 'babel-register', '../bin/now', '--help']
  // const args = ['--help']
  const now = spawn(command, args)

  now.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  now.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  now.on('error', (err) => {
    console.log(`error: ${err}`)
    t.fail(err)
    // console.log(`stderr: ${data}`);
  });

  now.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    t.pass();
    t.end()
  });
})
