<script>
    import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
    import "@ui5/webcomponents/dist/Badge";
    import "@ui5/webcomponents/dist/Title";
    import "@ui5/webcomponents/dist/Tab";
    import "@ui5/webcomponents/dist/TabContainer";
    import {DB} from '$lib/db/db'
    import {DBTables} from '$lib/stores/db'
    import TableFields from "$lib/components/TableFields.svelte";
    import TableIndexes from "$lib/components/TableIndexes.svelte";
    import TableEvents from "$lib/components/TableEvents.svelte";
    import TableData from "$lib/components/TableData.svelte";
    export let data;
    let tableName="",tableDef="",schemaType="",schemaColor=1, permissions="";
    let tableFields,tableEvents,tableIndexes;
    $: data, getTableData()
    
    async function getTableData() {
        tableName = data.tableName;
        if (!tableName) return;
        tableDef = $DBTables[tableName]
        let def = tableDef.split(' ')
        schemaType = def[3]
        schemaColor = schemaType === "SCHEMAFULL" ? 8:1;
        permissions = def.slice(5).join()
        let res = await DB.query('INFO FOR TABLE '+ tableName)
        tableFields = res[0].result.fd
        tableIndexes = res[0].result.ix
        tableEvents = res[0].result.ev
    }
</script>

<Breadcrumbs currPage={tableName}></Breadcrumbs>
<ui5-title>{tableName}</ui5-title>
<ui5-badge color-scheme={schemaColor}>{schemaType}</ui5-badge>

<ui5-tabcontainer class="full-width" fixed>
	<ui5-tab text="Data" slected>
        <TableData {tableName}></TableData>
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


