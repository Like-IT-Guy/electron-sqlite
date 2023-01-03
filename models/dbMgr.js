const sqlite = require('better-sqlite3-with-prebuilds');
const db = new sqlite('./database/test.db');
exports.db = db;