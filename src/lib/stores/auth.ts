import { writable } from "svelte/store";
import { browser } from '$app/environment';

interface AuthUser {
    server: string,
    username: string,
    namespace: string,
    database: string,
  }

const defaultValue: AuthUser= {server: "", username: "", namespace: "", database: ""} as AuthUser
const initialValue = browser ? JSON.parse(localStorage.getItem('authuser')) ?? defaultValue : defaultValue 
export const authenticatedUser = writable<AuthUser>(initialValue);

authenticatedUser.subscribe( (value) => {
    if (browser){
        localStorage.authuser = JSON.stringify(value)
    } 
}) 
export const dbtoken = writable("");
