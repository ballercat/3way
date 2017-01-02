/* eslint-env node, es6 */
const electron = require('electron');
const proc = require('child_process');

proc.spawn(
    electron,
    [
      '.',
      'tests/base.txt',
      'tests/local.txt',
      'tests/remote.txt'
    ]
);
