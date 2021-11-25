//setup connection ---------------------
const pg = require('pg');
const dbURI = "postgres://jlpjzmkfcwxgfa:da48aedd015f3dabc38773136eb7ff0745a414d95cbf7a9c607f75a12c1a090e@ec2-52-31-219-113.eu-west-1.compute.amazonaws.com:5432/dd7qf9370fk6to";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
	connectionString: connstring,
	ssl: {rejectUnauthorized: false}
});


//database methods -----------------------
let dbMethods = {}; //create empty object

//----------------------------------------

dbMethods.getAllTodoLists = function(){
    let sql = "SELECT * FROM todoliste";
    return pool.query(sql); //return the promise

}

//--------------------------------------
dbMethods.createTodoList = function(listName, userid) {
    let sql = 'INSERT INTO todoliste (id, date, listname, userid) VALUES(DEFAULT, DEFAULT, $1, $2) returning*';
	let values = [listName, userid];
    return pool.query(sql, values); //return the promise

}
dbMethods.createListItems = async function(userid, listName, listItem){
    let selectListId = await pool.query("SELECT id FROM todoliste WHERE userid = $1 AND listname = $2", [userid, listName]);
    let listID = selectListId.rows[selectListId.rows.length-1].id
    console.log(listID)
    console.log("what")
    let sql = 'INSERT INTO chores (listid, name, item, itemid) VALUES($1, $2, $3, DEFAULT)'
    let values = [listID, listName, listItem];
    return pool.query(sql, values);
}

//-------------------------------------
dbMethods.deleteTodoList = function(id){
    pool.query("DELETE FROM chores WHERE listid = $1", [id]);
    let sql = "DELETE FROM todoliste WHERE id = $1 RETURNING *";
    let values = [id];
    return pool.query(sql, values); //return the promise
    
}

// export dbMethods ---------------------
module.exports = dbMethods;



