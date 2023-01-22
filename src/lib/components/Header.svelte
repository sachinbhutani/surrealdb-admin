<script>
    import { authenticatedUser } from "$lib/stores/auth";
    import "@ui5/webcomponents-fiori/dist/Assets";
    import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme";
    import "@ui5/webcomponents-fiori/dist/ShellBar";
    import "@ui5/webcomponents-fiori/dist/ShellBarItem";
    import "@ui5/webcomponents/dist/Button";
    import "@ui5/webcomponents-icons/dist/log"
    import "@ui5/webcomponents-icons/dist/palette"
    import "@ui5/webcomponents-icons/dist/database"
    import "@ui5/webcomponents-icons-tnt/dist/data-store"
    import "@ui5/webcomponents-icons/dist/sap-box"
    import "@ui5/webcomponents/dist/Popover"
    import "@ui5/webcomponents/dist/List"
    import "@ui5/webcomponents/dist/ListItem"
    import { goto } from "$app/navigation";

    setTheme('sap_horizon')
   
    let secondaryTitle = "", profileInitial ="";
    let profileSettingsPopover;
    $: $authenticatedUser, updateTitle();

    function updateTitle(){
        if ($authenticatedUser.username !== ""){
            profileInitial = $authenticatedUser.username.charAt(0).toUpperCase()
            secondaryTitle = "User: " + $authenticatedUser.username + " NS: " + $authenticatedUser.namespace + " DB:" + $authenticatedUser.database;
        } else{ 
            secondaryTitle = "" 
        }
    }
    function logout(){
        $authenticatedUser = { server: "", username: "", namespace: "", database: ""}
        goto("/login")
    }

    const handleProfileClick = (event) => {
		profileSettingsPopover.showAt(event.detail.targetRef);
	};

    const handleProfileSettingsSelect = (event) =>{
        const selectedKey = event.detail.item.getAttribute("data-key");
		if (selectedKey === "sign-out") {
			logout()
		}else {
            if(selectedKey === "namespace" || "database"){
                goto("/app")
            }
        }
            
    };
</script>

<header class="app-header">
    <ui5-shellbar primary-title="SurrealDB-Admin" on:profile-click={handleProfileClick}>
        <!-- <ui5-shellbar-item id="theseSwitcher" icon="palette" text="Theme"></ui5-shellbar-item> -->
        {#if ($authenticatedUser.username !== "")}
        <ui5-avatar slot="profile" size="XS" initials="{profileInitial}"></ui5-avatar>
        {/if}
    </ui5-shellbar>   

</header>
<ui5-popover bind:this={profileSettingsPopover} id="profile-pop" class="app-bar-profile-popover" placement-type="Bottom" horizontal-align="Right">
    <div class="profile-settings-list">
        <ui5-list mode="SingleSelect" separators="None" bind:this={profileSettingsPopover} on:item-click={handleProfileSettingsSelect}>
            <ui5-li icon="sap-box" data-key="namespace">{$authenticatedUser.namespace}</ui5-li>
            <ui5-li icon="tnt/data-store" data-key="database">{$authenticatedUser.database}</ui5-li>
            <ui5-li icon="log" data-key="sign-out">Sign out</ui5-li>
        </ui5-list>
    </div>
</ui5-popover>
