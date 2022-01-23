const pg = require('pg');
const Pool = pg.Pool;


// const loginUser = require('./core/user');
const connectionString = process.env.DATABASE_URL || 'postgresql://decproc:1234@localhost:5432/login';

let pool 
if (process.env.DATABASE_URL){
	pool = new Pool({
		connectionString,
		ssl: {rejectUnauthorized:false}
	})
}else{
	pool = new Pool({connectionString,ssl:false})
}

module.exports = pool;