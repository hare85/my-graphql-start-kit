import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const logger = require('../utils/logger').getLogger('mysql');

const env = process.env.NODE_ENV || 'development';
const config = require('config').get('mysql')[env];

config.operatorsAliases = Sequelize.Op;
config.logging = msg => logger.debug('DB -', msg);

let sequelize = null;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
