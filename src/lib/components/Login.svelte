<script lang="ts">
    import "@ui5/webcomponents/dist/Input";
    import "@ui5/webcomponents/dist/Label";
    import "@ui5/webcomponents/dist/Button";
    import "@ui5/webcomponents/dist/MessageStrip";
    import { authenticatedUser} from "$lib/stores/auth";
    import { Login} from "$lib/db/db"
    import { goto } from "$app/navigation";

    export let dbserver = "http://localhost:8000",username ="",password = "", namespace = "" , database = "";
    export let dbserverError = "", usernameError = "", passwordError = "", namespaceError = "", databaseError = "" , errorMessage = "";
    async function logintoDB(){
        //check all the required fields are avilable
        dbserverError = "" 
        usernameError = ""
        passwordError = ""
        namespaceError = ""
        databaseError = ""
        errorMessage = ""

        if (dbserver === "") { dbserverError = "Error" }
        if (username === "") { usernameError = "Error" }
        if (password === "") { passwordError = "Error"}
        if (namespace === "") { namespaceError = "Error"}
        if (database === "") {databaseError = "Error"}

        let result = await Login(dbserver,username,password,namespace,database)
        if (result instanceof  Error) {
            errorMessage = result.name + ": " + result.message
        }else {
            let authUser = {server: dbserver, username: username, namespace: namespace, database: database, dbtoken: result}; 
            authenticatedUser.set(authUser)
           goto("/app")
        }
    }
</script>
<br>
<div class="login-container">
    <div class="col">
    {#if errorMessage !== "" && errorMessage !== undefined}
    <div>
        <ui5-message-strip design="Negative" hide-icon hide-close-button>{errorMessage}</ui5-message-strip>
    </div>
    {/if}
    {#if $authenticatedUser.username !== "" && $authenticatedUser.username !== undefined}
    <div>
        {$authenticatedUser.username + ":" + $authenticatedUser.namespace + ":" + $authenticatedUser.database}
    </div>
    {/if}
    <div>
        <ui5-label for="DBServer" required show-colon class="strong">Server</ui5-label>
    </div>
    <div>
        <ui5-input id="DBServer" placeholder="http://localhost:8000" required value={dbserver} value-state={dbserverError} on:input={(e) => dbserver = e.target.value} ></ui5-input>
    </div>
    
    <div>
        <ui5-label for="user" required show-colon class="strong">User</ui5-label>
    </div>
    <div>
        <ui5-input id="user" placeholder="User" required value={username} value-state={usernameError} on:input={(e) => username = e.target.value}></ui5-input>
    </div>
    
    <div>
        <ui5-label for="password" required show-colon class="strong">Password</ui5-label>
    </div>
    <div>    
        <ui5-input id="password" type="Password" placeholder="password" value-state={passwordError} required value={password} on:input={(e) => password = e.target.value}></ui5-input>
    </div>
    <div>
        <ui5-label for="namespace" required show-colon class="strong">Namespace</ui5-label>
    </div>
    <div>
        <ui5-input id="namespace" placeholder="Namespace" required value={namespace} value-state={namespaceError} on:input={(e) => namespace = e.target.value}></ui5-input>
    </div>
    <div>
        <ui5-label for="database" required show-colon class="strong">Database</ui5-label>
    </div>
    <div>
        <ui5-input id="database" placeholder="Database" required value={database} value-state={databaseError} on:input={(e) => database = e.target.value}></ui5-input>
    </div>
    <div>
        <ui5-button design="Emphasized" on:click={logintoDB} on:keydown={logintoDB}>Submit</ui5-button>
    </div>
    </div>
</div>

<style>
    .login-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        text-align: center;
    }
    .col{
        display: flex;
        flex-direction: column;
        text-align: left;
    }
    .strong{
        font-weight: bold;
    }
</style>