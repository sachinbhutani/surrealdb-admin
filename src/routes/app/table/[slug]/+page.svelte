<script>
    import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
    import "@ui5/webcomponents/dist/Badge";
    import "@ui5/webcomponents/dist/Title";
    import "@ui5/webcomponents/dist/Tab";
    import "@ui5/webcomponents/dist/TabContainer";
    import {Query} from '$lib/db/db'
    import {DBTables} from '$lib/stores/db'
    import TableFields from "$lib/components/TableFields.svelte";
    import TableIndexes from "$lib/components/TableIndexes.svelte";
    import TableEvents from "$lib/components/TableEvents.svelte";
    import TableData from "$lib/components/TableData.svelte";
    export let data;
    let tableName="",page=1,tableDef="",schemaType="",schemaColor=1, permissions="", limit;
    let tableFields,tableEvents,tableIndexes;
    $: data, getTableData()
    
    async function getTableData() {
        tableName = data.tableName;
        limit = data.limit;
        page = data.page;
        if (!tableName) return;
        tableDef = $DBTables[tableName]
        if (!tableDef) return;
        let def = tableDef.split(' ')
        schemaType = def[3]
        schemaColor = schemaType === "SCHEMAFULL" ? 8:1;
        permissions = def.slice(5).join()
        let [res] = await Query('INFO FOR TABLE '+ tableName)
        tableFields = res.result.fd
        tableIndexes = res.result.ix
        tableEvents = res.result.ev
    }
</script>

<Breadcrumbs currPage={tableName}></Breadcrumbs>
<ui5-title>{tableName}</ui5-title>
<div class="label">
    <ui5-badge color-scheme={schemaColor}>{schemaType}</ui5-badge>
</div>
<br>
<ui5-tabcontainer fixed>
	<ui5-tab text="Data" slected>
        <TableData {tableName} {page} {limit} {tableFields}></TableData>
    </ui5-tab>
	<ui5-tab text="Fields">
        <TableFields {tableFields}></TableFields>
    </ui5-tab>
	<ui5-tab text="Events">
        <TableEvents {tableEvents}></TableEvents>
    </ui5-tab>
	<ui5-tab text="Indexes">
        <TableIndexes {tableIndexes}></TableIndexes>
    </ui5-tab>
    <ui5-tab text="Definition">
        {tableDef}
    </ui5-tab>
    <ui5-tab text="Permissions">
        <!-- TODO: combine field and table permissions in this tab -->
        {permissions}
    </ui5-tab>
</ui5-tabcontainer>

<style>
    .label{
        flex-grow: 0;
    }
</style>