var Dexie = require('dexie');

var db = new Dexie('BudgetSharyDatabase');

db.version(1).stores({
    persons: "++id,name,share",
    products: "++id,name,price",
    events: "++id,name"
});

db.open();

module.exports = db;