
<script>
    import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
    import Sidebar from '$lib/components/Sidebar.svelte';
    import { authenticatedUser } from '$lib/stores/auth';
    export let data; // data.tables: all tables in the current NS,DB
</script>

<div class="app-header">
        <Header />
</div>
<div class="app-main">
    <div class="sidebar-col">
        {#if $authenticatedUser.username !==null && $authenticatedUser.username !== undefined}
        <Sidebar tables={data.tables}></Sidebar>
        {/if}
    </div>
    <div class="main-col">
            <slot />
    </div>
</div>
<Footer></Footer>
<style>
    .app-main{
        display: flex;
        flex-direction: row;
        align-items: stretch;
        min-height: 800px;
    }
    .main-col{
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .sidebar-col{
        flex-direction: column;
    }
</style>