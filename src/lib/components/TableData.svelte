<script lang="js">
    import { Query,Select } from "$lib/db/db";
    import {goto} from '$app/navigation'
    import "@ui5/webcomponents/dist/Table"
    import "@ui5/webcomponents/dist/TableCell"
    import "@ui5/webcomponents/dist/TableColumn"
    import "@ui5/webcomponents/dist/TableRow"
    import "@ui5/webcomponents/dist/Icon"
    import "@ui5/webcomponents-fiori/dist/Bar"
    import "@ui5/webcomponents-icons/dist/history"
    import "@ui5/webcomponents-icons/dist/open-command-field"
    import "@ui5/webcomponents-icons/dist/close-command-field"
    import "@ui5/webcomponents-icons/dist/navigation-right-arrow"
    import "@ui5/webcomponents-icons/dist/navigation-left-arrow"
    import "@ui5/webcomponents-icons/dist/filter"
    import "@ui5/webcomponents/dist/Panel"
    import "@ui5/webcomponents/dist/Label"
    import "@ui5/webcomponents/dist/Input"
    import "@ui5/webcomponents/dist/MultiInput"
    import "@ui5/webcomponents/dist/Token"
    import "@ui5/webcomponents/dist/features/InputSuggestions"
    export let limit;
    export let page = 1;
    export let tableName = "";
    export let tableFields = {};
    let loading = true; 
    let tableData=[], tbRowCount =0, tbColumns=["id"], tbQueryTime="",tbQueryStatus="";
    let startRecord=1,endRecord=1,lastPage;
    let tableCount =0, skip =0;
    let selectFields = [];
    let whereString ="";
    let errorMessage ="";
    $: tableName,page,limit, getTableData() && getTableCount()
    $: tableName && resetFilters()
    function resetFilters(){
        selectFields = [];
        whereString = "";
        errorMessage= "";
        getTableData();
    }
    async function getTableData(){
        tableData = [];
        tbColumns=["id"]
        loading = true;
        skip = (page-1)*limit;
        startRecord = parseInt(skip) +1;
        let result = await Select(tableName,skip,limit,selectFields,whereString)
        if (result instanceof  Error){
            errorMessage = result.message;
            loading= false;
            return;
        }
        let [tbData] = result;
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
    function selectTokenChange(event){
        if (!event.target.value) {
			return;
		}
        const newToken = event.target.value;
        var isDuplicate  = selectFields.includes(newToken)
        if (isDuplicate){
            event.target.valueState = "Error";
			setTimeout(function () {
				event.target.valueState = "Normal";
			}, 2000);
            return;
        } 
        selectFields.push(newToken)
        event.target.value = "";
        selectFields = selectFields //to render all token 
    }
    function selectTokenDelete(event){
        const token = event.detail.token.text;
        if (token){
            selectFields = selectFields.filter((v)=> { return v != token;});
        }
    }
</script>
<div>
    <ui5-panel collapsed>
        <div slot="header">
            {#if (selectFields.length >0) || (whereString !="")}
            <ui5-icon name="filter" design="Positive" on:click={(e)=>toggleFilter(e)} on:keydown={(e)=>toggleFilter(e)}></ui5-icon> Filter
            {:else}
            <ui5-icon name="filter" design="Critical" on:click={(e)=>toggleFilter(e)} on:keydown={(e)=>toggleFilter(e)}></ui5-icon> Filter
            {/if}
            
        </div>
        <div class="form-col">
            <div class="form-row"><ui5-label for="selectString">SELECT</ui5-label></div>
            <div class="form-row">
                <ui5-multi-input id="selectString" placeholder="Enter filed name and press enter" style="width: 90%" on:change={(e)=>selectTokenChange(e)} on:token-delete={(e)=>selectTokenDelete(e)}>
                <div slot="valueStateMessage">Field is already in the list</div>
                {#each selectFields as sf}
                    <ui5-token slot="tokens" text={sf}></ui5-token>
                {/each}
                {#each Object.entries(tableFields) as [field,_]}
                    <ui5-suggestion-item text="{field}"></ui5-suggestion-item>
                {/each}
                </ui5-multi-input>
            </div>
            <div class="form-row"><ui5-label for="whereString">WHERE</ui5-label></div>
            <div class="form-row"><ui5-input id="whereString" placeholder="enter where condition" style="width: 90%" value={whereString} on:input={(e) => whereString = e.target.value}></ui5-input></div>
            <div class="form-row"><ui5-button design="Emphasized" on:click={getTableData} on:keydown={getTableData}>Run with Filters</ui5-button></div>
        </div>
    </ui5-panel>
</div>
{#if errorMessage}
    <ui5-message-strip design="Negative" hide-close-button>{errorMessage}</ui5-message-strip>
{/if}
<ui5-table busy={loading} no-data-text={loading?"Loading...": "No Data"} sticky-column-header>
    {#if !loading}
        {#each tbColumns as col}
        <ui5-table-column slot="columns">
            <span>{col}</span>
        </ui5-table-column>
        {/each}

        {#if tbRowCount > 0}
        {#each tableData as tRow}
        <ui5-table-row id={tRow.id}>
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

<style>
    .form-row{
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-top: 5px;
    }
    .form-col{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
</style>