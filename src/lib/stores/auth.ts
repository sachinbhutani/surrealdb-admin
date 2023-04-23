import { writable } from "svelte/store";
import { browser } from '$app/environment';

interface AuthUser {
    server: string,
    username: string,
    namespace: string,
    database: string,
    dbtoken: string,
  }

export type {AuthUser};

const defaultValue: AuthUser= {server: "", username: "", namespace: "", database: "", dbtoken: ""} as AuthUser
const initialValue = browser ? JSON.parse(localStorage.getItem('authuser')) ?? defaultValue : defaultValue 
export const authenticatedUser = writable<AuthUser>(initialValue);

authenticatedUser.subscribe( (value) => {
    if (browser){
        localStorage.authuser = JSON.stringify(value)
    } 
}) 

export const dbtoken = writable("");

const initialTheme = browser ? localStorage.getItem('theme') ?? 'sap_horizon' : 'sap_horizon'
export const theme = writable(initialTheme);

theme.subscribe( (value) => {
    if(browser){
        localStorage.theme = value;
    }
})

export const sideNavCollapsed = writable(false);