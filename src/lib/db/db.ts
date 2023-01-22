import Surreal from "surrealdb.js";

export const DB = new Surreal();

export async function Login(server: string, username: string ,password: string,namespace: string, database: any): Promise<any> {
	let dbtoken = null 
	try {
		DB.connect(server + "/rpc");
		dbtoken = await DB.signin({
			user: username,
			pass: password,
		});
	} catch(e){
		console.log("Login error:",e)
		return e;
	}
	try {
		await DB.use(namespace, database);
	}
	catch(e){
		console.log("Login error:",e);
		return e
	}
	return dbtoken
}

export async function Query(queryString: string): Promise<any>{
	let result;
	try {
		result = await DB.query(queryString);
		// console.log("Query Result:",result)
	}
	catch(e){
		console.log("Query Error:",e)
		return e
	}
	return result
}

DB.on('open',()=> {console.log("DB connection is now open")});
DB.on('close',()=> { console.log("DB connection closed")});