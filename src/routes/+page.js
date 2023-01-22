import { browser } from "$app/environment";
import { goto } from "$app/navigation";
export const ssr = false;
if(browser) {
    goto("/login")
}
