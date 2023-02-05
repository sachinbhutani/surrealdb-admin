import Surreal from "surrealdb.js";
import { updateDBTables } from "$lib/stores/db";
import {get} from 'svelte/store'

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

export async function Update(tableName: string, recordId: string, record:{}): Promise<any>{
	if (DB.isConnected === false){
		await reconnect(DB);
		updateDBTables.set(!get(updateDBTables))
	}
	let thing = `${tableName}:${recordId}`
	return await DB.surreal.update(thing,record)
}

export async function Select(tableName: string,start: number, limit: number, selectFields: string[],where: string): Promise<any>{
	let result;
	if (DB.isConnected === false){
		await reconnect(DB);
		updateDBTables.set(!get(updateDBTables))
	}
	try {
		let queryString = "SELECT ";
		if (selectFields.length > 0) 
			queryString += "id," + selectFields.join(",") + " "
		else
			queryString += "* "
		queryString += `FROM ${tableName} `
		if (where)
			queryString +=`WHERE ${where} `
		if (limit !== undefined && start !== undefined) {
			queryString += `LIMIT ${limit} START AT ${start} `
		}else {
			queryString += `LIMIT 30 START AT 0 `
		}

		result = await DB.surreal.query(queryString)
	}
	catch(e){
		console.log("Query Error:",e)
		return e
	}
	return result
}

async function reconnect(conn: DBType){
	console.log("DB: trying to reconnect")
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