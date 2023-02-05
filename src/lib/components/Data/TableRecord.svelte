<script>
    
    import "@ui5/webcomponents/dist/Title"
    import "@ui5/webcomponents/dist/TabContainer"
    import "@ui5/webcomponents-icons/dist/save"
    import "@ui5/webcomponents/dist/MessageStrip"
    import "@ui5/webcomponents-icons/dist/decline"
    import JsonEditor from "../layout/JSONEditor.svelte";
    import { goto} from "$app/navigation";
    import {page} from "$app/stores"
    import RecordForm from "./RecordForm.svelte";
    import { Update } from "$lib/db/db";

    export let tableName="", recordId ="", record = {}
    let updateJSONEditor;
    let errorMessage = "", errorMessageDesign = ""
    let l, p
    l = $page.data.limit;
    p = $page.data.page;
    async function saveRecord(){
        errorMessageDesign = "Positive"
        let r = await Update(tableName,recordId,record)
        if (r instanceof Error){
            errorMessageDesign = "Negative"
            errorMessage = r.name + ": " + r.message
            return 
        }
        errorMessage = "Record Updated"
    }
    function handleTabClick(event){
        if(event.detail.tabIndex == 1){
            updateJSONEditor()
        }
    
    }
    function updateRecordObject(){
        record = record;
    }
</script>
<div class="record">
    <div class="button-row">
        <ui5-button icon="decline" on:click={goto(`/app/table/${tableName}?p=${p}&l=${l}`)} on:keydown={goto(`/app/table/${tableName}?p=${p}&l=${l}`)}>Close</ui5-button>
        <ui5-button icon="save" on:click={saveRecord} on:keydown={saveRecord} design="Positive">Save</ui5-button>
    </div>
    {#if errorMessage !== ""} 
        <ui5-message-strip design={errorMessageDesign}>{errorMessage}</ui5-message-strip>
    {/if}
    <ui5-title>{tableName}:{recordId}</ui5-title>
    <ui5-tabcontainer on:tab-select={handleTabClick} fixed>
        <ui5-tab text="Form" selected>
        <RecordForm bind:rec={record} on:updateObject={updateRecordObject}></RecordForm>
        </ui5-tab>
        <ui5-tab text="Raw">
        <div class="record-json">
            <JsonEditor bind:output={record} bind:updateEditor={updateJSONEditor}></JsonEditor>
        </div>
        </ui5-tab>
    </ui5-tabcontainer>
    <!-- {JSON.stringify(record,null,2)}     -->
</div>

<style>
    .button-row{
        display:flex;
    }
</style>
