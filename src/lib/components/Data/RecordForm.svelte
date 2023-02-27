<script>
    import "@ui5/webcomponents/dist/Input"
    import "@ui5/webcomponents/dist/Label"
    import "@ui5/webcomponents/dist/TextArea"
    import "@ui5/webcomponents/dist/Switch"
    import "@ui5/webcomponents/dist/DateTimePicker"
    import { createEventDispatcher } from 'svelte';
    
    export let rec;
    export let indent = 10
    const dispatchEvent= createEventDispatcher();


    function isPrimitiveArray(obj){
        if (!Array.isArray(obj)){
            return false
        }
        let hasObject = obj.some(value=> { return typeof value == "object"})
        return !hasObject
    }
    function updateValue(event) {
        let k = event.target.getAttribute("data-key")
        rec[k] = event.target.value
        dispatchEvent('updateObject')
    }
    function updateNumberValue(event) {
        let k = event.target.getAttribute("data-key")
        rec[k] = Number(event.target.value)
        dispatchEvent('updateObject')
    }
    function updateBooleanValue(event){
        let k = event.target.getAttribute("data-key")
        rec[k] = event.target.checked
        dispatchEvent('updateObject')
    }
    // function updateDateValue(event){
    //     let k = event.target.getAttribute("data-key")
    //     rec[k] = event.target.dateValue;
    //     dispatchEvent("updateObject")
    // }
    function updateObjectValue(event){
        let k = event.target.getAttribute("data-key")
        rec[k] = JSON.parse(event.target.value)
        dispatchEvent('updateObject')
    }
    function updateArrayValue(event){
        const k = event.target.getAttribute("data-key")
        const pos = event.detail.token.getAttribute("indx")
        //const deletedToken = event.detail?.token.text
        //const pos = rec[k].indexOf(deletedToken)
        if (pos > -1){
            rec[k].splice(pos,1)
            rec[k] = rec[k];
        }
        dispatchEvent('updateObject')
    }
    function pushArrayValue(event){
        if (!event.target.value)    
            return;
        let k = event.target.getAttribute("data-key")
        rec[k].push(event.target.value)
        rec[k]= rec[k]
        event.target.value ="";
        dispatchEvent('updateObject')
    }
</script>

<div class="form-col" style="padding-left: {indent}px">
{#each Object.entries(rec) as [k,v]}
    {@const T = typeof v}
    {#if k !== "id"}
    <div class="form-row"><ui5-label>{k}</ui5-label></div>
        {#if T == "boolean"}
            <ui5-switch accessible-name="graphical" design="Graphical" checked={v} data-key={k} on:change={updateBooleanValue}></ui5-switch>
        {/if}
        {#if T == "string"}
            {#if v.length < 50}
                <div class="form-row"><ui5-input value={v} style="width: 80%" data-key={k}  on:input={updateValue}></ui5-input></div>
            {:else}
                <div class="form-row"><ui5-textarea value={v} style="width: 80%" growing data-key={k} on:input={updateValue}></ui5-textarea></div>
            {/if}
        {/if}
        {#if v instanceof Date}
            <div class="form-row"><ui5-input value={v.toString()} style="width: 80%" data-key={k}  on:input={updateValue}></ui5-input></div>
        {/if}
        {#if T == "number"}
            <div class="form-row"><ui5-input value={v} style="width: 80%" data-key={k} on:input={updateNumberValue} type="Number"></ui5-input></div>
        {/if}
        {#if T == "object"}
            {#if isPrimitiveArray(v)}
                <div class="form-row">
                <ui5-multi-input style="width: 80%" data-key={k}  on:change={pushArrayValue} on:token-delete={updateArrayValue}>
                {#each v as text,indx}
                    <ui5-token slot="tokens" text={text} indx={indx}></ui5-token>
                {/each}
                </ui5-multi-input>
                </div>
            {:else}
                <svelte:self rec={v} indent={indent+20} on:updateObject></svelte:self>
                <!-- <div class="form-row">
                <ui5-textarea value={JSON.stringify(v,null,2)} style="width: 60%" growing data-key={k} on:input={updateObjectValue}>
                </ui5-textarea>
                </div> -->
            {/if}
        {/if}
    {/if}
{/each}
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
    display: row;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
}
</style>