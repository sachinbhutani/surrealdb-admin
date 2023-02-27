<script>
    import Scopes from "$lib/components/layout/Scopes.svelte";
    import "@ui5/webcomponents-icons/dist/task"
    import "@ui5/webcomponents/dist/Button"
    import "@ui5/webcomponents-icons/dist/add"
    export let data;
</script>
<br><Scopes scopes={data.scopes}></Scopes>