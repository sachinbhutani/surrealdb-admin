
<script lang="js">
    import "@ui5/webcomponents-icons/dist/home";
    import "@ui5/webcomponents-icons/dist/task";
    import "@ui5/webcomponents-icons/dist/table-view";
    import "@ui5/webcomponents-icons/dist/overlay";
    import "@ui5/webcomponents-icons/dist/slim-arrow-down";
    import "@ui5/webcomponents-fiori/dist/SideNavigation.js";
    import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js"
    import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js"
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";
    import { sideNavCollapsed } from "$lib/stores/auth";
    import { updateDBTables, DBTables } from "$lib/stores/db"
    import { onMount } from "svelte";
    import { Query} from '$lib/db/db'

    $: $updateDBTables, getTables()

    let tables= {}
    onMount(async ()=>{
        getTables();
    });
    function navigate(event){
        if (browser) {
            if (event.detail.item.id !== undefined)
                goto(event.detail.item.id)   
        }
    }

    async function getTables(){
        if (browser){
        let dbInfo = await Query("INFO FOR DB;")
            tables = dbInfo[0].result.tb;
            $DBTables = tables;
        }
    }

</script> 
<ui5-side-navigation on:ui5-selection-change={(e)=>navigate(e)} collapsed={$sideNavCollapsed}>
    <ui5-side-navigation-item text="Home" icon="home" id="/app" href="/app"></ui5-side-navigation-item>
    <ui5-side-navigation-item text="Query" icon="task" id="/app/query" href="/app/query"></ui5-side-navigation-item>
    <ui5-side-navigation-item text="Tables" icon="table-view" expanded id="/app/tables/" href="/app/tables">
        {#each Object.entries($DBTables) as [tb,tbinfo]}
         <ui5-side-navigation-sub-item text="{tb}" id="/app/table/{tb}"></ui5-side-navigation-sub-item>
        {/each}
    </ui5-side-navigation-item>
    <ui5-side-navigation-item text="Scopes" icon="overlay" id="/app/scopes" href="/app/scopes"></ui5-side-navigation-item>   
</ui5-side-navigation>
