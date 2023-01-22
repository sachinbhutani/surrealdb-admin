<script> 
    import "@ui5/webcomponents/dist/Breadcrumbs"
    import {authenticatedUser} from '$lib/stores/auth'
    export let currPage = ""; 
</script>
<ui5-breadcrumbs separator-style="DoubleSlash">
	<ui5-breadcrumbs-item>NS: {$authenticatedUser.namespace} </ui5-breadcrumbs-item>
	<ui5-breadcrumbs-item>DB: {$authenticatedUser.database}</ui5-breadcrumbs-item>
    {#if currPage !== ""}
	<ui5-breadcrumbs-item>{currPage}</ui5-breadcrumbs-item>
    {/if}
</ui5-breadcrumbs>