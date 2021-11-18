//setup connection ---------------------
const pg = require('pg');
const dbURI = "postgres://yacyidmbuohcsc:e4c8cb98d1fdf82233e9469fc44aea2b9bcd5febec9c491f8c0fdc3f91225834@ec2-54-72-155-238.eu-west-1.compute.amazonaws.com:5432/dfm0aa91i3jh7m";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
	connectionString: connstring,
	ssl: {rejectUnauthorized: false}
});


//database methods -----------------------
let dbMethods = {}; //create empty object

//----------------------------------------

dbMethods.getAllTodoLists = function(){
    let sql = "SELECT * FROM todolists";
    return pool.query(sql); //return the promise

}

//--------------------------------------
dbMethods.createTodoList = function(heading, blogtext, userid) {
    let sql = 'INSERT INTO todolists (id, date, heading, blogtext, userid) VALUES(DEFAULT, DEFAULT, $1, $2, $3) returning*';
	let values = [updata.heading, updata.blogtext, userid];
    return pool.query(sql, values); //return the promise

}

//-------------------------------------
dbMethods.deleteBlogPost = function(id){
    let sql = "DELETE FROM todolists WHERE id = $1 RETURNING *";
    let values = [id];
    return pool.query(sql, values); //return the promise
    
}

// export dbMethods ---------------------
module.exports = dbMethods;



