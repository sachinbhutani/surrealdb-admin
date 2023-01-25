import Surreal from "surrealdb.js";

interface AuthUser {
    server: string,
    username: string,
    namespace: string,
    database: string,
    dbtoken: string,
  }

interface DBType {
	surreal: Surreal,
	isConnected: boolean,
}

export const DB: DBType = {surreal: new Surreal(), isConnected: false};

export async function Login(server: string, username: string ,password: string,namespace: string, database: any): Promise<any> {
	let dbtoken = ""
	try {
		DB.surreal.connect(server + "/rpc");
		dbtoken = await DB.surreal.signin({
			user: username,
			pass: password,
		});
		//TODO: implement timeout
	} catch(e){
		console.log("Login error:",e)
		return e;
	}
	try {
		await DB.surreal.use(namespace, database);
	}
	catch(e){
		console.log("Login error:",e);
		return e
	}
	DB.isConnected = true;
	return dbtoken === "" ? password : dbtoken;
}

export async function Query(queryString: string): Promise<any>{
	let result;
	console.log("DB.isConnected:",DB.isConnected)
	if (DB.isConnected === false){
		await reconnect(DB);
	}
	try {
		result = await DB.surreal.query(queryString);
	}
	catch(e){
		console.log("Query Error:",e)
		return e
	}
	return result
}

export async function Select(tableName: string,start: number, limit: number): Promise<any>{
	let result;
	console.log("DB.isConnected:",DB.isConnected)
	if (DB.isConnected === false){
		await reconnect(DB);
	}
	try {
		result = await DB.surreal.query(`SELECT * FROM ${tableName} LIMIT ${limit} START AT ${start}`)
	}
	catch(e){
		console.log("Query Error:",e)
		return e
	}
	return result
}

async function reconnect(conn: DBType){
	console.log("trying to reconnect")
	const a = JSON.parse(localStorage.getItem('authuser'))
	await conn.surreal.connect(a.server+"/rpc")
	if (a.username === "root"){
		await conn.surreal.signin({user:a.username, pass: a.dbtoken})
	}else {
		await conn.surreal.authenticate(a.dbtoken)
	}
	await conn.surreal.use(a.namespace,a.database);
	conn.isConnected = true;
}

DB.surreal.on('error',()=>{console.log("DB connection error")})
DB.surreal.on('open',()=> {console.log("DB connection is now open")});
DB.surreal.on('close',()=> { console.log("DB connection closed")});