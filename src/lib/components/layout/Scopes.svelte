<script>
    import "@ui5/webcomponents/dist/Panel"
    import "@ui5/webcomponents/dist/List"
    import "@ui5/webcomponents/dist/ListItem"
    import "@ui5/webcomponents-icons/dist/overlay"
    export let scopes;
</script>
<ui5-panel id="scopes-list" accessible-role="Complementary" header-text="Scopes" class="full-width">
    {#if Object.entries(scopes).length === 0}
    <center> No Data</center>
    {:else}
    <ui5-list>
    {#each Object.entries(scopes) as [sc,scinfo]}    
        <ui5-li icon="overlay" id={sc} description={scinfo}>{sc}</ui5-li>
    {/each}
    </ui5-list>
    {/if}
</ui5-panel>
<style>
</style>