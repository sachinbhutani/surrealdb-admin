
<script>
    export const ssr = false;

    import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
    import Sidebar from '$lib/components/Sidebar.svelte';
    import { authenticatedUser } from '$lib/stores/auth';
    export let data; // data.tables: all tables in the current NS,DB

</script>

<div class="row g-0">
    <div class="col-md-12">
        <Header />
    </div>
</div>
<div class="row g-0">
    <div class="col-md-2">
        {#if $authenticatedUser.username !==null && $authenticatedUser.username !== undefined}
        <Sidebar tables={data.tables}></Sidebar>
        {/if}
    </div>
    <div class="col-md-10">
            <slot />
    </div>
</div>
<Footer></Footer>