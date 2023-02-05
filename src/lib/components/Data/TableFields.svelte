<script>
    import "@ui5/webcomponents/dist/Table"
    import "@ui5/webcomponents/dist/TableCell"
    import "@ui5/webcomponents/dist/TableColumn"
    import "@ui5/webcomponents/dist/TableRow"
    export let tableFields = {}
    function parseFieldDef(defString) {
        let fd = defString.split(" ")
        let fieldDef = { type:"any", assert: "", value:"", permissions: "" }
        let typeIndex = fd.indexOf("TYPE", 4)
        let valueIndex = fd.indexOf("VALUE",5)
        let assertIndex = fd.indexOf("ASSERT",5)
        let permissionIndex = fd.indexOf("PERMISSIONS",7)
        if (typeIndex > -1) { 
            fieldDef.type = fd[typeIndex+1]
        }
        if (valueIndex > -1) {
            let valueStringEnd = 0;
            if (assertIndex > -1) {
                valueStringEnd = assertIndex 
            }else {
                if(permissionIndex > -1){
                    valueStringEnd = permissionIndex;
                }
            }
            fieldDef.value = fd.slice(valueIndex+1,valueStringEnd).join(' ')
        }
        if(assertIndex > -1){
            let assertStringEnd =fd.length;
            if (permissionIndex > -1) {
                assertStringEnd = permissionIndex
            }
            fieldDef.assert = fd.slice(assertIndex+1,assertStringEnd).join(' ')
        }
        if(permissionIndex > -1){
            fieldDef.permissions = fd.slice(permissionIndex+1).join(' ')
        }
        return fieldDef
    }
</script>

<ui5-table>
	<ui5-table-column slot="columns">
		<span>Field</span>
	</ui5-table-column>
    <ui5-table-column slot="columns">
		<span>Type</span>
	</ui5-table-column>
    <ui5-table-column slot="columns">
		<span>Value</span>
	</ui5-table-column>
    <ui5-table-column slot="columns">
		<span>Assertions</span>
	</ui5-table-column>
    <ui5-table-column slot="columns">
		<span>Permissions</span>
	</ui5-table-column>
    {#if tableFields !== undefined}
    {#each Object.entries(tableFields) as [field,fieldDef]}
        {@const fd = parseFieldDef(fieldDef)}
        <ui5-table-row>
            <ui5-table-cell>{field}</ui5-table-cell>
            <ui5-table-cell>{fd.type}</ui5-table-cell>
            <ui5-table-cell>{fd.value}</ui5-table-cell>
            <ui5-table-cell>{fd.assert}</ui5-table-cell>
            <ui5-table-cell>{fd.permissions}</ui5-table-cell>
        </ui5-table-row>
    {/each}
    {/if}
</ui5-table>


