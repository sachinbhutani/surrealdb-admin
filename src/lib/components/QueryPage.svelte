<script lang="ts">
    import "@ui5/webcomponents/dist/Button";
    import "@ui5/webcomponents/dist/TextArea"
    import "@ui5/webcomponents/dist/Label"
    import "@ui5/webcomponents/dist/Title"
    import "@ui5/webcomponents/dist/MessageStrip"
    import {updateDBTables} from '$lib/stores/db'
    import { Query} from "$lib/db/db"
    import Breadcrumbs from "./Breadcrumbs.svelte";
    import {theme} from '$lib/stores/auth'
    //monaco-stuff
    import { onMount } from "svelte";
    import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
    let divEl;
    let editor;
    let Monaco;
    onMount(async () => {
        self.MonacoEnvironment = {
        getWorker: function (_moduleId, label) {
            return new jsonWorker();
        },
        };
        let monacoTheme = "vs-light";
        if ($theme.indexOf('dark') > -1) {
            monacoTheme = "vs-dark"
        }
        Monaco = await import("monaco-editor");
        editor = Monaco.editor.create(divEl, {
        value: "",
        language: "json",
        theme: monacoTheme,
        readOnly: true,
        scrollBeyondLastLine: false,
        });
        return () => {
        editor.dispose();
        };
    });
    //end monaco stuff

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
        editor.setValue(queryresult)
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
<div class="query-output" bind:this={divEl}></div>
<style>
    .query-output{
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        overflow-y: auto;
    }
</style>
<!-- <ui5-textarea id="queryresult" readonly rows="20" style="height:500px" value={queryresult} placeholder="Query Result" value-state={queryResultStatus}></ui5-textarea> -->