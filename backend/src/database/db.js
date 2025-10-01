const sqlite = require('sqlite3');
const path = require('path');
const db = new sqlite.Database(path.resolve('./ecommerce.db'), {fileMustExist: true});

module.exports = db;