import Surreal from "surrealdb.js";
import { updateDBTables, isDBConnected } from "$lib/stores/db";
import {get} from 'svelte/store'
import { authenticatedUser } from "$lib/stores/auth";
import type { AuthUser } from "$lib/stores/auth";

interface DBType {
	surreal: Surreal,
}

export const TableDef = {
	name : { fieldType: "string", isRequired: true, prefix: "DEFINE TABLE", label: "Table Name", placeholder: "@name", value: ""},
	schemaType: {fieldType: "option", isRequired: true, options: ["SCHEMALESS","SCHEMAFULL"], placeholder: "Select Schema Type", value:""},
	permissions: {fieldType: "text", isRequired:false, placeholder: `[ NONE | FULL | FOR select @expression | FOR create @expression | FOR update @expression | FOR delete @expression ] `, prefix: "PERMISSIONS", value:""}
}


export const DB: DBType = {surreal: new Surreal()};

export async function Login(server: string, username: string ,password: string,namespace: string, database: any): Promise<any> {
	let dbtoken = ""
	try {
		await DB.surreal.connect(server + "/rpc");
		dbtoken = await DB.surreal.signin({
			user: username,
			pass: password,
		});
		console.log("DB TOken for root:",dbtoken);
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
	isDBConnected.set(true);
	dbtoken = dbtoken? dbtoken: password; //no token is returned for root user.
	return dbtoken;
}

export async function Query(queryString: string): Promise<any>{
	let result;
	console.log("Query:",queryString)
	if (get(isDBConnected) === false){
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
	if (get(isDBConnected) === false){
		await reconnect(DB);
		updateDBTables.set(!get(updateDBTables))
	}
	let thing = `${tableName}:${recordId}`
	let result;
	try {
		  result = await DB.surreal.update(thing,record)
	}catch(e){
		return e
	}
	updateDBTables.set(!get(updateDBTables))
	return result
}

export async function Select(tableName: string,start: number, limit: number, selectFields: string[],where: string): Promise<any>{
	let result;
	if (get(isDBConnected) === false){
		await reconnect(DB);
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
	//let authuser = localStorage.getItem('authuser') ?? "";
	let authuser: AuthUser = get(authenticatedUser)
	console.log("DB: trying to reconnect with user", JSON.stringify(authuser))
	await conn.surreal.connect(authuser.server+"/rpc")
	try{
		if (authuser.username === "root"){
			await conn.surreal.signin({user:authuser.username, pass: authuser.dbtoken})
		}else {
			await conn.surreal.authenticate(authuser.dbtoken)
		}
	}catch(e){
		console.log("Connection Error:",e)
		isDBConnected.set(true)
	}
	await conn.surreal.use(authuser.namespace,authuser.database);
	isDBConnected.set(true)
}

export async function Use(namespace: string, database:string): Promise<any>{
	let result;
	let authuser: AuthUser = get(authenticatedUser)
	if (get(isDBConnected) === false){
		await reconnect(DB);
	}
	try {
		
		result = await DB.surreal.use(namespace,database);
	}
	catch(e){
		console.log("Error while switching NS,DB :",e)
		return e
	}
	authuser.namespace = namespace;
	authuser.database = database;
	authenticatedUser.set(authuser);
	return result
}

DB.surreal.on('error',()=>{console.log("DB connection error")})
DB.surreal.on('open',()=> {console.log("DB connection is now open")});
DB.surreal.on('close',()=> { 
	console.log("DB connection closed")
	DB.surreal.invalidate()
});

