import { Query } from "$lib/db/db";
export const load = (async() => {
    let scopes = {}
    let scInfo = await Query("INFO FOR DB;")
    scopes = scInfo[0].result.sc;
    return { scopes: scopes}
});