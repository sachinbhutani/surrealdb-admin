<script lang="js">
    import "@ui5/webcomponents/dist/Table"
    import "@ui5/webcomponents/dist/TableCell"
    import "@ui5/webcomponents/dist/TableColumn"
    import "@ui5/webcomponents/dist/TableRow"
    export let tableEvents= {}
    function parseEventsDef(defString) {
        let ev = defString.split(" ")
        let eventDef = { when:"", then:"" }
        let whenIndex =ev.indexOf("WHEN", 4)
        let thenIndex = ev.indexOf("THEN",5)
        eventDef.when = ev.slice(whenIndex+1,thenIndex).join(' ')
        eventDef.then = ev.slice(thenIndex+1).join(' ')
        return eventDef
    }
</script>

<ui5-table>
	<ui5-table-column slot="columns">
		<span>Event</span>
	</ui5-table-column>
    <ui5-table-column slot="columns">
		<span>When</span>
	</ui5-table-column>
    <ui5-table-column slot="columns">
		<span>Then</span>
	</ui5-table-column>
    {#if tableEvents !== undefined}
    {#each Object.entries(tableEvents) as [evname,evDef]}
        {@const ev = parseEventsDef(evDef)}
        <ui5-table-row>
            <ui5-table-cell>{evname}</ui5-table-cell>
            <ui5-table-cell>{ev.when}</ui5-table-cell>
            <ui5-table-cell>{ev.then}</ui5-table-cell>
        </ui5-table-row>
    {/each}
    {/if}
</ui5-table>


