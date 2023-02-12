
<script>
    import "@ui5/webcomponents/dist/Button"
    import "@ui5/webcomponents-icons/dist/add"
    import "@ui5/webcomponents/dist/ComboBox"
    import "@ui5/webcomponents/dist/ComboBoxItem"
    import "@ui5/webcomponents/dist/Input"
    import "@ui5/webcomponents/dist/DateTimePicker"
    import "@ui5/webcomponents/dist/TextArea"
    import "@ui5/webcomponents/dist/MultiInput"
    import "@ui5/webcomponents/dist/Token"
    import { createEventDispatcher } from 'svelte';
    
    const dispatchEvent= createEventDispatcher();
    export let newFields = [];
    function addField(){
        newFields.push({fieldType: "", fieldName:"",fieldValue: ""})
        newFields = newFields
    }

    function updateFieldType(event){
        let i = event.target.getAttribute("data-index")
        let fieldType = event.target.value 
        newFields[i].fieldType = fieldType;
        if ( fieldType === "array") {
            newFields[i].fieldValue = []
        }else if (fieldType === "boolean"){
            newFields[i].fieldValue = false;
        }else{
            newFields[i].fieldValue = null; // set null for strings, numbers, objects
        }       
    }
    function updateFieldName(event){
        let i = event.target.getAttribute("data-index")
        newFields[i].fieldName = event.target.value;
        dispatchEvent("addNewFields")
    }
    function updateFieldValue(event){
        let i = event.target.getAttribute("data-index")
        newFields[i].fieldValue = event.target.value;
        dispatchEvent("addNewFields")
    }
    function updateDateFieldValue(event){
        let i = event.target.getAttribute("data-index")
        newFields[i].fieldValue = event.target.dateValue;
        dispatchEvent("addNewFields")
    }
    function updateArrayValue(event){
        const i = event.target.getAttribute("data-index")
        const pos = event.detail.token.getAttribute("token-index")
        if (pos > -1){
            newFields[i].fieldValue.splice(pos,1)
            newFields[i].fieldValue = newFields[i].fieldValue;
        }
        dispatchEvent("addNewFields")
    }
    function pushArrayValue(event){
        if (!event.target.value)    
            return;
        let i = event.target.getAttribute("data-index")
        newFields[i].fieldValue.push(event.target.value)
        newFields[i].fieldValue= newFields[i].fieldValue
        event.target.value ="";
        dispatchEvent("addNewFields")
    }
    function updateBooleanValue(event){
        let i = event.target.getAttribute("data-index")
        newFields[i].fieldValue = event.target.checked
        dispatchEvent("addNewFields")
    }
</script>
{#each newFields as v,i}
{@const T = v.fieldType}
    <div class="new-field">
    <ui5-combobox placeholder="Field Type" data-index="{i}" on:change={updateFieldType}>
        <ui5-cb-item text="string"></ui5-cb-item>
        <ui5-cb-item text="number"></ui5-cb-item>
        <ui5-cb-item text="boolean"></ui5-cb-item>
        <ui5-cb-item text="date-time"></ui5-cb-item>
        <ui5-cb-item text="array"></ui5-cb-item>
        <ui5-cb-item text="object"></ui5-cb-item>        
    </ui5-combobox>
    <ui5-input placeholder="Field Name" value-state={v.fieldName? "None":"Error"} value={v.fieldName} data-index={i} on:input={updateFieldName} required></ui5-input>
    {#if T === "date-time"}
    <ui5-datetime-picker on:change={updateDateFieldValue} format-pattern="YYYY-MM-DDTHH:mm:ss" data-index={i}></ui5-datetime-picker>
    {:else if T === "number"}
    <ui5-input placeholder="Field Value" value={v.fieldValue} data-index={i} type="Number" on:input={updateFieldValue}></ui5-input>
    {:else if T === "boolean"}
    <ui5-switch accessible-name="graphical" design="Graphical" checked={v} data-index={i} on:change={updateBooleanValue}></ui5-switch>
    {:else if T=== "string"}
    <ui5-input placeholder="Field Value" value={v.fieldValue} data-index={i} on:input={updateFieldValue}></ui5-input>
    {:else if T=== "array"}
    <ui5-multi-input style="width: 50%" data-index={i}  on:change={pushArrayValue} placeholder="Enter array element and press enter" on:token-delete={updateArrayValue}>
        {#if v.fieldValue.length && (v.fieldValue.length > 0)}
        {#each v.fieldValue as text,indx}
        <ui5-token slot="tokens" text={text} token-index={indx}></ui5-token>
        {/each}
        {/if}
    </ui5-multi-input>
    {:else if T=== "object"}
    <ui5-textarea growing style="width:50%" value={v.fieldValue? v.fieldValue: ""} placeholder="Enter object as string" data-index={i} on:input={updateFieldValue}></ui5-textarea>
    {/if}
    </div>
{/each}
<ui5-button design="Positive" icon="add" on:click={addField} on:keydown={addField}>Add new field</ui5-button>
<style>
    .new-field{
        display: flex;
        flex-direction: row;
        padding-left: 2.5rem;
        padding-top: 10px;
        padding-bottom: 10px;
        gap: 2rem;
    }
</style>
