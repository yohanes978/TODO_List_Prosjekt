const express = require("express");
const server = express();
const PORT = process.env.PORT || 8080;
server.set("port", PORT);


const pg= require('pg');
const dbURI = "postgres://ycdimiwsffnvqi:1c188ef0abfd933f96272cd1fdde871c47d85af729b933498e9943dcb621c72d@ec2-63-33-14-215.eu-west-1.compute.amazonaws.com:5432/d96tfuv362q5qi";
const connstring = process.env.DATABASE_URL||dbURI;
const pool = new pg.Pool({
	connectionString:connstring,
	ssl:{rejectUnauthorized:false}
});

// middleware ---------------------------
server.use(express.static("public"));
server.use(express.json());

// endpoints ----------------------------
server.get("/blogpost", async function(req, res, next) {
	let sql = "SELECT * FROM blogpost";
	try{
		let result = await pool.query(sql);
		res.status(200).json(result.rows).end();
	}
	catch(err){
      res.status(500).json({error:err}).end();
	}
	
});

server.post("/blogpost", async function(req, res, next) {	
	console.log(req.body.country);
	res.status(200).send("Hello from POST").end();
});

server.delete("/", function(req, res, next) {
	res.status(200).send("Hello from DELETE").end();
});


// start server ------------------------
server.listen(server.get("port"), function () {
	console.log("server running", server.get("port"));
});

