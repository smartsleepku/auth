import './common/env';
import Server from './common/server';
import routes from './routes';
import * as database from './common/database';
import * as config from 'ordered-config';

console.log('config env: ' + process.env.CONFIG_ENV);
console.log(config.database);

database.connect().then();

const port = parseInt(process.env.PORT);
export default new Server()
  .router(routes)
  .listen(port);
