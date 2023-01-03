var dbMgr = require('./dbMgr');
var db = dbMgr.db;
var table_name = "test";

//Fetch All
exports.getList = () => {
    var query = "Select * from " + table_name + " order by id ASC";
    let statment = db.prepare(query);
    let response = statment.all();
    return response;
}

//Insert
exports.addName = (name) => {
    var query = "Insert into test (name) values('"+name+"')";
    db.exec(query);
}