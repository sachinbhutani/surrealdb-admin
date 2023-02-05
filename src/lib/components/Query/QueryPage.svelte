<script lang="ts">
    import "@ui5/webcomponents/dist/Button";
    import "@ui5/webcomponents/dist/TextArea"
    import "@ui5/webcomponents/dist/Label"
    import "@ui5/webcomponents/dist/Title"
    import "@ui5/webcomponents/dist/MessageStrip"
    import {updateDBTables} from '$lib/stores/db'
    import { Query} from "$lib/db/db"
    import Breadcrumbs from "../layout/Breadcrumbs.svelte";
    import JsonOutput from "../layout/JSONOutput.svelte";
    
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
            queryResultMessage = result[0].status + ", Time:" + result[0].time;
            queryResultStatus = "Positive"
            queryresult = JSON.stringify(result,null,2)
        }
       // editor.setValue(queryresult)
    }
</script>
<Breadcrumbs currPage="Run Query"></Breadcrumbs>
<ui5-title>Query</ui5-title>
<ui5-textarea id="querystring" rows="10" growing placeholder="Enter a SURREALQL query here" value={querystring} on:input={(e) => querystring = e.target.value}></ui5-textarea>
<ui5-button on:click={RunQuery} disabled={queryButtonDisabled} design="Emphasized" on:keydown={RunQuery}>{queryButtonText}</ui5-button>
<br>
{#if queryResultMessage !== ""}
<ui5-message-strip design={queryResultStatus} hide-close-button>{queryResultMessage}</ui5-message-strip>
{/if}
<ui5-label for="queryResult"><strong>Result</strong></ui5-label>
<JsonOutput output={queryresult}></JsonOutput>
<!-- <ui5-textarea id="queryresult" readonly rows="20" style="height:500px" value={queryresult} placeholder="Query Result" value-state={queryResultStatus}></ui5-textarea> -->