
<script>
    import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
    import Sidebar from '$lib/components/layout/Sidebar.svelte';
    import { authenticatedUser } from '$lib/stores/auth';
</script>

<div class="app-header">
        <Header />
</div>
<div class="app-main">
    <div class="sidebar-col">
        {#if $authenticatedUser.username !==null && $authenticatedUser.username !== undefined}
        <Sidebar></Sidebar>
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