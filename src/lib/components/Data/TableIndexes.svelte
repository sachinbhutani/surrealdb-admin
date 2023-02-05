<script lang="js">
    import "@ui5/webcomponents/dist/Table"
    import "@ui5/webcomponents/dist/TableCell"
    import "@ui5/webcomponents/dist/TableColumn"
    import "@ui5/webcomponents/dist/TableRow"
    export let tableIndexes= {}
    function parseIndexDef(defString) {
        let ix = defString.split(" ")
        let indexDef = { fields:"", unique: false }
        let uniqueIndex = ix.indexOf("UNIQUE", 6)
        if (uniqueIndex > -1) {
            indexDef.unique = true; 
            indexDef.fields = ix.slice(6,uniqueIndex).join(' ')
        }else {
            indexDef.fields = ix.slice(6).join(' ')
        }
        return indexDef
    }
</script>

<ui5-table>
	<ui5-table-column slot="columns">
		<span>Index</span>
	</ui5-table-column>
    <ui5-table-column slot="columns">
		<span>Fields</span>
	</ui5-table-column>
    <ui5-table-column slot="columns">
		<span>Unique</span>
	</ui5-table-column>
    {#if tableIndexes !== undefined}
    {#each Object.entries(tableIndexes) as [ixname,ixDef]}
        {@const ix = parseIndexDef(ixDef)}
        <ui5-table-row>
            <ui5-table-cell>{ixname}</ui5-table-cell>
            <ui5-table-cell>{ix.fields}</ui5-table-cell>
            <ui5-table-cell>{ix.unique}</ui5-table-cell>
        </ui5-table-row>
    {/each}
    {/if}
</ui5-table>


