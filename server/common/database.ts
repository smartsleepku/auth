import mongoose from 'mongoose';
import * as config from 'ordered-config';
import L from './logger';
import { default as sleep } from 'sleep-promise';

const uri = 'mongodb://' +
  config.database.username + ':' +
  config.database.password + '@' +
  config.database.hostname +
  ':' + config.database.port +
  '/' + config.database.db +
  '?authSource=' + config.database.authSource;

export async function connect() {
  var connection = mongoose.connection;
  L.debug('db uri:', uri);

  connection.on('error', function(error) {
    L.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
  });
  connection.on('connected', function() {
    L.info('MongoDB connected!');
  });
  connection.on('reconnected', function () {
    L.warn('MongoDB reconnected!');
  });
  connection.on('disconnected', function() {
    L.warn('MongoDB disconnected!');
    sleep(30000).then(function() {
      mongoose.connect(uri, {
        useNewUrlParser: true,
        autoReconnect: false,
      });
    });
  });
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    autoReconnect: false,
  });
}

export async function close() {
  mongoose.connection.close();
}
