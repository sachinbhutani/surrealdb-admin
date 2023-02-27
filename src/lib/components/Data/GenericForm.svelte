<script>
    import "@ui5/webcomponents/dist/Switch"
    import "@ui5/webcomponents/dist/Input"
    import "@ui5/webcomponents/dist/TextArea"
    import "@ui5/webcomponents/dist/ComboBox"
    import { onMount } from "svelte"
    import { Query } from "$lib/db/db";

    export let formDef = {}
    let rec = {}
    let query = ""; 
    let queryMessage = "";
    let queryStatus = ""

    onMount (()=>{
        queryMessage = "";
        for ( let [k] of Object.entries(formDef)){
            setErrorMsg(k)
        }
    });

    async function executeQuery(){
        queryMessage = ""
        let [res] = await Query(query)
        if (res.status === "OK"){
            queryStatus = "Positive"
            queryMessage = res.status + " - " + res.time
        }else {
            queryStatus = "Negative"
            queryMessage = res.status + " - " + res.message
        }
    }

    function updateQuery(){
        let ar= [];
        query = ""
        for (let [key, value] of Object.entries(formDef)) {
            if (rec[key]) {
                if (value.prefix) {ar.push(value.prefix)}
                ar.push(rec[key])
            }
        }
        ar.push(";")
        query = ar.join(" ");
    }

    function setErrorMsg(k){
        formDef[k].valueState = "None"
        formDef[k].message = ""
        if (formDef[k].isRequired) {
            if (rec[k] == undefined || rec[k] == ""){
                formDef[k].valueState = "Error"
                formDef[k].message = "Value Required"
            }
        }
    }
    function updateValue(event) {
        let k = event.target.getAttribute("data-key")
        rec[k] = event.target.value
        updateQuery()
        setErrorMsg(k)
    }
    function updateNumberValue(event) {
        let k = event.target.getAttribute("data-key")
        rec[k] = Number(event.target.value)
        updateQuery()
        setErrorMsg(k)
    }
    function updateBooleanValue(event){
        let k = event.target.getAttribute("data-key")
        rec[k] = event.target.checked
        updateQuery()
        setErrorMsg(k)
    }
    function updateOptionValue(event){
        let k = event.target.getAttribute("data-key")
        rec[k] = event.target.value
        updateQuery()
        setErrorMsg(k)

    }
</script>
{#if (queryMessage !== "")}
<ui5-message-strip design={queryStatus} hide-close-button>{queryMessage}</ui5-message-strip>
{/if}
<div class="form-col">
    {#each Object.entries(formDef) as [k,v]}
        {@const T = v.fieldType}
            {#if (v.prefix)}
            <div class="form-row"><ui5-label required={v.isRequired}>{v.prefix}</ui5-label></div>
            {/if}
            {#if T == "boolean"}
                <ui5-switch accessible-name="graphical" design="Graphical" checked={v} data-key={k} on:change={updateBooleanValue}></ui5-switch>
            {/if}
            {#if T == "string"}
                <div class="form-row">
                    <ui5-input value={v.value} value-state={v.valueState} style="width: 80%" data-key={k}  on:input={updateValue} placeholder={v.placeholder} required={v.isRequired}></ui5-input>
                </div>
            {/if}
            {#if T == "option"}
                <div class="form-row">
                    <ui5-combobox on:selection-change={updateOptionValue} placeholder={v.placeholder}  data-key={k} required={v.isRequired} value-state={v.valueState}>
                        {#each v.options as op}
                        <ui5-cb-item text="{op}">{op}</ui5-cb-item>
                        {/each}
                    </ui5-combobox>
                </div>
            {/if}
            {#if T == "text"}
                <div class="form-row">
                    <ui5-textarea class="textarea" rows="10" growing value={v.value} value-state={v.valueState} style="width: 80%" data-key={k} on:input={updateValue} placeholder={v.placeholder} required={v.isRequired}>
                    </ui5-textarea>
                </div>
            {/if}
            {#if v.value instanceof Date}
                <div class="form-row">
                    <ui5-input value-state={v.valueState} value={v.toString()} style="width: 80%" data-key={k} on:input={updateValue} required={v.isRequired}>
                    </ui5-input>
                </div>
            {/if}
            {#if T == "number"}
                <div class="form-row">
                    <ui5-input value={v} style="width: 80%" data-key={k} on:input={updateNumberValue} value-state={v.valueState} type="Number" required={v.isRequired}>
                    </ui5-input>
                </div>
            {/if}
    {/each}
</div> 
<div class="buttons">
    <ui5-button design="Emphasized" on:click={executeQuery} on:keydown={executeQuery}>Save</ui5-button>
</div>
<style>
.form-row{
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 5px;
    flex-grow:1;
}
.form-col{
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    gap: 10px;
}
.buttons {
    display: block;
}
</style>