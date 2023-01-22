import { writable } from "svelte/store";

interface Tables {
    [key:string]: string
}

export const updateDBTables  = writable(false);
export const DBTables = writable<Tables>({"":""});