#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { startServer, clearCache } from './server';

yargs(hideBin(process.argv))
  .command('start', 'Start the caching proxy server', {
    port: { type: 'number', demandOption: true },
    origin: { type: 'string', demandOption: true },
  }, (argv) => {
    startServer(argv.port, argv.origin);
  })
  .command('clear-cache', 'Clear the cache', {
    key: { type: 'string', requiresArg: false}
  }, () => {
    clearCache();
  })
  .parse();
