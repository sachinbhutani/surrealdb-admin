<script>
    import { authenticatedUser, theme, sideNavCollapsed } from "$lib/stores/auth";
    import "@ui5/webcomponents-fiori/dist/Assets";
    import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme";
    import "@ui5/webcomponents-fiori/dist/ShellBar";
    import "@ui5/webcomponents-fiori/dist/ShellBarItem";
    import "@ui5/webcomponents/dist/Button";
    import "@ui5/webcomponents-icons/dist/log"
    import "@ui5/webcomponents-icons/dist/palette"
    import "@ui5/webcomponents-icons/dist/database"
    import "@ui5/webcomponents-icons-tnt/dist/data-store"
    import "@ui5/webcomponents-icons/dist/favorite"
    import "@ui5/webcomponents-icons/dist/sap-box"
    import "@ui5/webcomponents-icons/dist/menu"
    import "@ui5/webcomponents/dist/Popover"
    import "@ui5/webcomponents/dist/List"
    import "@ui5/webcomponents/dist/ListItem"
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import "@ui5/webcomponents-icons/dist/favorite"
   
    let secondaryTitle = "", profileInitial ="";
    let profileSettingsPopover,themeSettingsPopover;
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

    const handleThemeSettingsToggle = (event) => {
		themeSettingsPopover.showAt(event.detail.targetRef);
	};

    const handleThemeChange = (event) => {
        let newTheme =event.detail.selectedItems[0].getAttribute("data-theme")
		setTheme(newTheme);
        $theme = newTheme;
		themeSettingsPopover.close();
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

    const starOnGithub = ()=>{
        goto("https://github.com/sachinbhutani/surrealdb-admin");
    }

    onMount( () => {
        setTheme($theme)
    })
    const sideNavToggle = ()=>{
        $sideNavCollapsed = !$sideNavCollapsed
    }
</script>

<header class="app-header">
    <ui5-shellbar primary-title="SurrealDB-Admin" on:profile-click={handleProfileClick}>
        <ui5-shellbar-item id="github" icon="favorite" on:click={starOnGithub} text="Star us on Github" tooltip="Star us on Github" on:keydown={starOnGithub}></ui5-shellbar-item>
        <ui5-shellbar-item id="themeSwitcher" icon="palette" text="Theme" on:click={handleThemeSettingsToggle} tooltip="switch theme"  on:keydown={handleThemeSettingsToggle}></ui5-shellbar-item>
        {#if ($authenticatedUser.username !== "")}
        <ui5-button icon="menu" slot="startButton" id="startButton" on:click={sideNavToggle} on:keydown={sideNavToggle}></ui5-button>
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

<ui5-popover bind:this={themeSettingsPopover} class="app-bar-theming-popover" placement-type="Bottom" horizontal-align="Right" header-text="Theme">
    <ui5-list mode="SingleSelect" on:selection-change={handleThemeChange}>
        <ui5-li icon="palette" data-theme="sap_horizon" selected>SAP Horizon Morning</ui5-li>
        <ui5-li icon="palette" data-theme="sap_horizon_dark">SAP Horizon Evening</ui5-li>
        <ui5-li icon="palette" data-theme="sap_horizon_hcb">SAP Horizon HCB</ui5-li>
        <ui5-li icon="palette" data-theme="sap_horizon_hcw">SAP Horizon HCW</ui5-li>
        <ui5-li icon="palette" data-theme="sap_fiori_3">SAP Quartz Light</ui5-li>
        <ui5-li icon="palette" data-theme="sap_fiori_3_dark">SAP Quartz Dark</ui5-li>
        <ui5-li icon="palette" data-theme="sap_fiori_3_hcb">SAP Quartz HCB</ui5-li>
        <ui5-li icon="palette" data-theme="sap_fiori_3_hcw">SAP Quartz HCW</ui5-li>
    </ui5-list>
</ui5-popover>