<script>
    import "@ui5/webcomponents/dist/Panel"
    import "@ui5/webcomponents/dist/List"
    import "@ui5/webcomponents/dist/ListItem"
    import "@ui5/webcomponents-icons/dist/table-view"
    import {DBTables} from '$lib/stores/db'
    import { goto } from "$app/navigation";
    import { DB } from "$lib/db/db";
    function getSchemaText(txt){
        if (txt.indexOf("SCHEMALESS") > -1)
            return "SCHEMALESS"
        else if (txt.indexOf("SCHEMAFULL") > -1)
                return "SCHEMAFULL"
            else 
                return ""
    }
    function browseTable(event){
        let tableName =event.detail.item.id
        goto(`app/table/${tableName}`)
    }
</script>
<ui5-panel id="table-list" accessible-role="Complementary" header-text="Tables" class="full-width" on:item-click={(e) =>browseTable(e)}>
    {#if Object.entries($DBTables).length === 0}
    <center> No Data</center>
    {:else}
    <ui5-list>
    {#each Object.entries($DBTables) as [tb,tbinfo]}    
    {@const schematext = getSchemaText(tbinfo)}
        <ui5-li icon="table-view" id={tb} additional-text={schematext} additional-text-state={schematext ==="SCHEMALESS"?"Error":"Success"}>{tb}</ui5-li>

    {/each}
    </ui5-list>
    {/if}
</ui5-panel>
<style>
</style>