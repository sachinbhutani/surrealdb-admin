<script>
    import "@ui5/webcomponents/dist/Title"
    import "@ui5/webcomponents/dist/Input"
    import "@ui5/webcomponents/dist/Label"
    import "@ui5/webcomponents-icons/dist/sap-box"
    import "@ui5/webcomponents-icons-tnt/dist/data-store"
    import "@ui5/webcomponents/dist/Panel"
    import {authenticatedUser} from '$lib/stores/auth'
    import { DB } from "$lib/db/db";
    import { updateDBTables } from "$lib/stores/db";
    let namespace="", database="", errorMessage = ""

    async function switchDatabase() {
        console.log("Switch to",namespace,database)
        try {
            let r = await DB.use(namespace,database)
        }catch(e){
            errorMessage = e.toString();
            return;
        }
        //change authstore if success
        $authenticatedUser.namespace = namespace
        $authenticatedUser.database = database 
        $updateDBTables = !$updateDBTables   
    }
</script>
<ui5-panel width="100%" accessible-role="Complementary" header-text="Change Namespace or Database for {$authenticatedUser.server} " class="full-width">

<div class="row">
    {#if errorMessage !== "" && errorMessage !== undefined}
    <div class="col-md-12">
        <ui5-message-strip design="Negative" hide-icon hide-close-button>{errorMessage}</ui5-message-strip>
    </div>
    {/if}
    <div class="col-md-12">
        <ui5-label for="namespaceInput" required show-colon >Namespace</ui5-label>
    </div>
    <div class="col-md-12">
        <ui5-input id="namespaceInput" placeholder="{$authenticatedUser.namespace}" on:input={(e) => namespace = e.target.value}>
            <ui5-icon id="sap-box" slot="icon" name="sap-box"></ui5-icon>
        </ui5-input>
    </div>
    <div class="col-md-12">
        <ui5-label for="databaseInput" required show-colon >Database</ui5-label>
    </div>
    <div class="col-md-12">
        <ui5-input id="databaseInput" placeholder="{$authenticatedUser.database}" on:input={(e) => database = e.target.value}>
            <ui5-icon id="database" slot="icon" name="tnt/data-store"></ui5-icon>
        </ui5-input>
    </div>
    <div class="col-md-12 float-end">
        <ui5-button design="Emphasized" on:click={switchDatabase}>Switch</ui5-button>
    </div>
</div>
</ui5-panel>