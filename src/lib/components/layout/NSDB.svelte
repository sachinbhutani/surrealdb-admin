<script>
    import "@ui5/webcomponents/dist/Title"
    import "@ui5/webcomponents/dist/Input"
    import "@ui5/webcomponents/dist/Label"
    import "@ui5/webcomponents-icons/dist/sap-box"
    import "@ui5/webcomponents-icons-tnt/dist/data-store"
    import "@ui5/webcomponents/dist/Panel"
    import {authenticatedUser} from '$lib/stores/auth'
    import { Use } from "$lib/db/db";
    import { updateDBTables } from "$lib/stores/db";

    let namespace="", database="", errorMessage = "", successMessage = ""

    async function switchDatabase() {
        console.log("Switch to",namespace,database)
        try {
            let r = await Use(namespace,database)
            successMessage = `Switched to Namespace: ${namespace} and Database: ${database}`
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
<ui5-panel accessible-role="Complementary" header-text="Change Namespace or Database for {$authenticatedUser.server} " class="full-width">
    {#if errorMessage !== "" && errorMessage !== undefined}
        <ui5-message-strip design="Negative" hide-icon hide-close-button>{errorMessage}</ui5-message-strip>
    {/if}
    {#if successMessage !== ""}
        <ui5-message-strip design="Positive" hide-icon hide-close-button>{successMessage}</ui5-message-strip>
    {/if}
    <div class="nsdb">
        <div>
        <div><ui5-label for="namespaceInput" required show-colon >Namespace</ui5-label></div>
        <ui5-input id="namespaceInput" placeholder="{$authenticatedUser.namespace}" on:input={(e) => namespace = e.target.value}>
            <ui5-icon id="sap-box" slot="icon" name="sap-box"></ui5-icon>
        </ui5-input>
        </div>
    
        <div>
        <div><ui5-label for="databaseInput" required show-colon >Database</ui5-label></div>
        <ui5-input id="databaseInput" placeholder="{$authenticatedUser.database}" on:input={(e) => database = e.target.value}>
            <ui5-icon id="database" slot="icon" name="tnt/data-store"></ui5-icon>
        </ui5-input>
        </div>
        <div>
        <ui5-button design="Emphasized" on:click={switchDatabase} on:keydown={switchDatabase}>Switch</ui5-button>
        </div>
    </div>
</ui5-panel>
<style>
    .nsdb{
        display: flex;
        flex-direction: column;
        align-items:flex-start;
    }
</style>