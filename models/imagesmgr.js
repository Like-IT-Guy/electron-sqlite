var dbMgr = require('./dbMgr');
var db = dbMgr.db;
var table_name = "images";

//Fetch All
exports.getList = () => {
    var query = "Select * from " + table_name + " order by id ASC";
    let statment = db.prepare(query);
    let response = statment.all();
    return response;
}

//Insert
exports.addImage = (image) => {
    var query = "Insert into " + table_name + " (image) values('"+image+"')";
    db.exec(query);
}