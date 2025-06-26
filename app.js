#!/usr/bin/env node
const minimist = require('minimist');
const {init}=require("./cli/index")

const argv = minimist(process.argv.slice(1));



function collectMultiFlagValues(flag) {
  const args = process.argv;
  const idx = args.indexOf(flag.length === 1 ? `-${flag}` : `--${flag}`);
  if (idx === -1) return undefined;
  const values = [];
  for (let i = idx + 1; i < args.length; i++) {
    if (args[i].startsWith('-')) break;
    values.push(args[i]);
  }
  return values.length > 0 ? values : undefined;
}

['crud', 'c', 'm', 'r'].forEach(flag => {
  const values = collectMultiFlagValues(flag);
  if (values) argv[flag] = values;
});

function collectFlagValues(flag) {
  const args = process.argv;
  const idx = args.indexOf(flag);
  if (idx === -1) return undefined;
  const values = [];
  for (let i = idx + 1; i < args.length; i++) {
    if (args[i].startsWith('-')) break;
    values.push(args[i]);
  }
  return values.length > 0 ? values : undefined;
}

// Only for -i, -d, -f
['-i', '-d', '-f'].forEach(flag => {
  const key = flag.replace('-', '');
  const values = collectFlagValues(flag);
  if (values) argv[key] = values;
});
init(argv)  
