<script>
    import GenericForm from "$lib/components/Data/GenericForm.svelte";
    import Breadcrumbs from "$lib/components/layout/Breadcrumbs.svelte";
    import {TableDef} from "$lib/db/db"
</script>
<Breadcrumbs currPage="Create Table"></Breadcrumbs>
<GenericForm formDef ={TableDef}></GenericForm> 