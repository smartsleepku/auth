import { exit } from 'process';
import { JwtService } from '../server/api/services/jwt.service';
import { ClientService } from '../server/api/services/client.service';
import * as database from '../server/common/database';

const argv = require('minimist')(process.argv.slice(2));

if (argv['clientId'] == null || argv['clientSecret'] == null) {
  console.log('USAGE:');
  console.log('  node bin/auth-client.js --clientId my-client --clientSecret my-secret');
  exit(1);
}

const token = new JwtService().encodeAuthorizedClient(argv['clientId'], argv['clientSecret']);

async function run(): Promise<void> {
  const service = new ClientService();
  await database.connect();
  await service.createAuthorizedClient(argv['clientId'], argv['clientSecret']);
  console.log('Created authorized client with token: ' + token);
  exit(0);
}

run().then();
