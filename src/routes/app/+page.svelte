<script>
    import Nsdb from "$lib/components/NSDB.svelte";
    import Tables from "$lib/components/Tables.svelte";
    import "@ui5/webcomponents-icons/dist/task"
</script>
<br>
<div class="menu-buttons">
<a href="/app/query"><ui5-button icon="task">Run Queries</ui5-button></a>

<a href="/app#table-list"><ui5-button icon="table-view">Browse Tables</ui5-button></a>
</div>
<Nsdb></Nsdb>
<a href="#tables"></a>
<Tables></Tables>


<style>
  .menu-buttons{
    display: flex;
    flex-direction: row;
    justify-content:center;
    gap: 10px;
  }
</style>

