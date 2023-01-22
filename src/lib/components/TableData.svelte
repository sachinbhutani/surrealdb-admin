<script lang="js">
    import { DB } from "$lib/db/db";
    import "@ui5/webcomponents/dist/Table"
    import "@ui5/webcomponents/dist/TableCell"
    import "@ui5/webcomponents/dist/TableColumn"
    import "@ui5/webcomponents/dist/TableRow"
    export let tableName = "";
    let loading = true; 
    let tableData=[],tbQueryStatus="",tbQueryTime="", tbRowCount =0, tbColumns=["id"];
    $: tableName, getTableData()
    async function getTableData(){
        tableData = [];
        tbColumns=["id"]
        loading = true;
        let tbData = await DB.query("SELECT * FROM "+tableName)
        tbQueryStatus = tbData[0].status;
        tbQueryTime = tbData[0].time;
        tableData = tbData[0].result
        tbRowCount = tableData.length;
        tableData.forEach((r,i)=>{
            //console.log(r)
            for (const [key, value] of Object.entries(r)) {
                if (key !== "id"){
                    //check if key is in columns 
                    if(tbColumns.indexOf(key) === -1){
                        tbColumns.push(key)
                    }
                }
                else{
                    tableData[i].id= tableData[i].id.substring(tableData[i].id.indexOf(":")+1)
                }
            }
            tbColumns = tbColumns // To enable re-rendering of the array on the DOM
        })
        tableData = tableData // To enable re-rendering of the arraye on the DOM
        loading = false;
    }
</script>

<ui5-table busy={loading} no-data-text={loading?"Loading...": "No Data"} sticky-column-header>
    {#each tbColumns as col}
	<ui5-table-column slot="columns">
		<span>{col}</span>
	</ui5-table-column>
    {/each}
    {#if tbRowCount > 0}
    {#each tableData as tRow}

    <ui5-table-row>
    {#each tbColumns as col}
        <ui5-table-cell>{tRow[col]? tRow[col]:""}</ui5-table-cell>
    {/each}
    </ui5-table-row>
    {/each}
    {/if}
</ui5-table>



