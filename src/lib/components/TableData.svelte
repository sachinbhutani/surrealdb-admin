<script lang="js">
    import { Query,Select } from "$lib/db/db";
    import {goto} from '$app/navigation'
    import "@ui5/webcomponents/dist/Table"
    import "@ui5/webcomponents/dist/TableCell"
    import "@ui5/webcomponents/dist/TableColumn"
    import "@ui5/webcomponents/dist/TableRow"
    import "@ui5/webcomponents-fiori/dist/Bar"
    import "@ui5/webcomponents-icons/dist/history"
    import "@ui5/webcomponents-icons/dist/open-command-field"
    import "@ui5/webcomponents-icons/dist/close-command-field"
    import "@ui5/webcomponents-icons/dist/navigation-right-arrow"
    import "@ui5/webcomponents-icons/dist/navigation-left-arrow"
    export let limit;
    export let page = 1;
    export let tableName = "";
    let loading = true; 
    let tableData=[], tbRowCount =0, tbColumns=["id"], tbQueryTime="",tbQueryStatus="";
    let startRecord=1,endRecord=1,lastPage;
    let tableCount =0, skip =0;
    $: tableName,page,limit, getTableData() && getTableCount()
    async function getTableData(){
        tableData = [];
        tbColumns=["id"]
        loading = true;
        skip = (page-1)*limit;
        startRecord = parseInt(skip) +1;
        //TODO: error handling
        let [tbData] = await Select(tableName,skip,limit)
        tbQueryStatus = tbData.status;
        tbQueryTime = tbData.time;
        tableData = tbData.result
        tbRowCount = tableData.length;
        endRecord = (tbRowCount < limit)? parseInt(startRecord) +parseInt(tbRowCount)-1:parseInt(startRecord)+parseInt(limit)-1
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
        tableData = tableData // To enable re-rendering of the array on the DOM
        loading = false;
    }
    async function getTableCount(){
        let [tbCount] = await Query("SELECT * FROM count((SELECT * FROM "+ tableName +"))")
        tableCount = tbCount.result[0];
        lastPage = Math.ceil(tableCount/limit)
    }
</script>

<ui5-table busy={loading} no-data-text={loading?"Loading...": "No Data"} sticky-column-header>
    {#if !loading}
        {#each tbColumns as col}
        <ui5-table-column slot="columns">
            <span>{col}</span>
        </ui5-table-column>
        {/each}

        {#if tbRowCount > 0}
        {#each tableData as tRow}
        <ui5-table-row>
            {#each tbColumns as col}
                <ui5-table-cell style="white-space:nowrap">{tRow[col]? tRow[col]:""}</ui5-table-cell>  
            {/each}
        </ui5-table-row>
        {/each}
        {/if}
    {/if}
</ui5-table>

<ui5-bar design="Footer">
    <ui5-button icon="close-command-field" slot="startContent" disabled={page==1} tooltip="First Page" on:click={goto(`/app/table/${tableName}?p=1&l=${limit}`)} on:keydown={goto(`/app/table/${tableName}?p=1&l=${limit}`)}></ui5-button>  
    <ui5-button icon="navigation-left-arrow" slot="startContent" disabled={page==1} tooltip="Previous Page" on:click={goto(`/app/table/${tableName}?p=${page-1}&l=${limit}`)} on:keydown={goto(`/app/table/${tableName}?p=1&l=${limit}`)}></ui5-button>
    <ui5-button design="Transparent">{startRecord}-{endRecord}/{tableCount}</ui5-button>
	<ui5-button icon="history" design="Transparent" slot="endContent">{tbQueryTime}</ui5-button>
    <ui5-button icon="navigation-right-arrow" slot="endContent" disabled={page==lastPage} tooltip="Next Page"on:click={goto(`/app/table/${tableName}?p=${parseInt(page)+1}&l=${limit}`)} on:keydown={goto(`/app/table/${tableName}?p=${page+1}&l=${limit}`)}></ui5-button>
    <ui5-button icon="open-command-field" slot="endContent" disabled={page==lastPage} tooltip="Next Page" on:click={goto(`/app/table/${tableName}?p=${lastPage}&l=${limit}`)} on:keydown={goto(`/app/table/${tableName}?p=${lastPage}&l=${limit}`)}></ui5-button>
</ui5-bar>