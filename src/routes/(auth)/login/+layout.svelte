
<script>
    export const ssr = false;
	import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte'
</script>

<div class="row g-0">
    <div class="col-md-12">
        <Header />
    </div>
</div>
<div class="row g-0">
    <div class="col-md-2"></div>
    <div class="col-md-10">
            <slot />
    </div>
</div>
<div class="row g-0">
    <div class="col-md-12">
    <Footer></Footer>
    </div>
</div>