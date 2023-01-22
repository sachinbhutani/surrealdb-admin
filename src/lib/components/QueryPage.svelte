<script>
    import "@ui5/webcomponents/dist/Button";
    import "@ui5/webcomponents/dist/TextArea"
    import "@ui5/webcomponents/dist/Label"
    import "@ui5/webcomponents/dist/MessageStrip"
    import {updateDBTables} from '$lib/stores/db'
    import { Query} from "$lib/db/db"
    import Breadcrumbs from "./Breadcrumbs.svelte";
    export let querystring = "",queryresult = "" ,queryButtonText = "Run", queryButtonDisabled = false, queryResultStatus="None", queryResultMessage = "";

    async function RunQuery(){
        queryButtonText = "Executing Query...."
        queryresult = ""
        queryButtonDisabled = true 
        queryResultStatus = "None"
        let result = await Query(querystring)
        queryButtonDisabled = false 
        queryButtonText = "Run"
        if (result instanceof Error){
            queryResultStatus = "Negative"
            queryResultMessage = result.message
        } else {
            $updateDBTables = !$updateDBTables
            queryResultMessage = result[0].status + " Time:" + result[0].time;
            queryResultStatus = "Positive"
            queryresult = JSON.stringify(result,null,2)
        }
        
        
    }
</script>
<Breadcrumbs currPage="Run Query"></Breadcrumbs>
<div class="row g-6">
    <div class="col">
        <ui5-label for="querystring">Query</ui5-label>
    </div>
</div>
<div class="row">
    <div class="col">
        <ui5-textarea id="querystring" style="height:200px" placeholder="Query" value={querystring} on:input={(e) => querystring = e.target.value}></ui5-textarea>
    </div>
</div>
<div class="row">
    <div class="col">
        <ui5-button on:click={RunQuery} disabled={queryButtonDisabled}>{queryButtonText}</ui5-button>
    </div>
</div>

<div class="row">
    <div class="col-xl-12">
        {#if queryResultMessage !== ""}
        <ui5-message-strip design={queryResultStatus} hide-icon hide-close-button>{queryResultMessage}</ui5-message-strip>
        {/if}
    </div>
</div>

<div class="row">
    <div class="col">
        <ui5-label for="queryResult">Result</ui5-label>
    </div>
</div>
<div class="row">
    <div class="col">
        <ui5-textarea id="queryresult" readonly rows="20" style="height:500px" value={queryresult} placeholder="Query Result" value-state={queryResultStatus}></ui5-textarea>
    </div>
</div>