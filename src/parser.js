/* eslint-env node, es6 */
'use strict';

function dataToDiff(data) {
  return {
    el: document.getElementById(`${data[0]}-diff`),
    value: readFile(data[1]),
    name: data[0]
  };
}

const parse = diffs => {
  function addLineNumber(seed, part) {
    let lineNumber = R.last(seed)
        ? R.last(seed).lineNumber + R.last(seed).count
         : 0;
    part.lineNumber = lineNumber;
    seed.push(part);
    return seed;
  }

  diffs.base.diff = diffs.base.value.split('\n');
  diffs.local.diff = R.reduce(
      addLineNumber,
      [],
      jsdiff.diffLines(diffs.base.value, diffs.local.value)
  );
  diffs.remote.diff = R.reduce(
      addLineNumber,
      [],
      jsdiff.diffLines(diffs.base.value, diffs.remote.value)
  );

  return diffs;
};

const parser = {
  parse: parse
}

return module.exports = parser;
