var Dexie = require('dexie');

var dbName = process.env.ENV == 'test' ? 'BudgetSharyDatabaseDev' : 'BudgetSharyDatabase';

var db = new Dexie(dbName);

db.version(1).stores({
    persons: "++id,name,share",
    products: "++id,name,price",
    budgets: "++id,name"
});

db.open();

module.exports = db;