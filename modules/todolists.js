const express = require('express');
const db = require('./databaseHandler.js');
const router = express.Router();

// endpoints ----------------------------
router.get("/grayrubiousmagyarosaurus", async function(req, res, next) {

	let sql= "SELECT * FROM grayrubiousmagyarosaurus";
	
	try{
	//let result = await pool.query(sql);
	let data = await todo.getAllTodoLists();
	res.status(200).json(data.rows).end();
	}
	catch(err){
		//res.status(500).json({error: err}).end();
		next(err);
	}
});

router.post("/grayrubiousmagyarosaurus", async function(req, res, next) {	
	let updata = req.body;
	let userid = 1; //must be changes when we implement users

	

	try{
		//let result = await pool.query(sql, values);
		let data = await todo.createTodoList(updata.heading, updata.chores, userid);
		if (data.rows.length > 0){
            console.log("test")
			res.status(200).json({msg: "The todolist was created succesfully"}).end();
		} else {
			throw "The todolist couldn´t be created";
		}
	}
	catch(err){
		res.status(500).json({error: err}).end;
		next(err);
	}
});

router.delete("/grayrubiousmagyarosaurus", async function(req, res, next) {
	
	let updata= req.body;

	//let sql = "DELETE FROM grayrubiousmagyarosaurus WHERE id = $1 RETURNING *";
	//let values = [updata.id];

	try{
		//let result = await pool.query(sql, values);
		//let data = await todo.deleteTodoList(updata.id);

		if(data.rows.length > 0){
			res.status(200).json({msg: "The todolist was deleted successfully"}).end();
		}
		else{
			throw "The todolist couldn´t be deleted";
		}
	}
	catch(err){
		//res.status(500).json({error: err}).end();
		next(err); //called by using next(error) inside a catchblock in anyone of the async middleware or endpoint-functions above the error-handler
	}
});



module.exports = router;
