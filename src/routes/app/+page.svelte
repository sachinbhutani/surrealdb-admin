<script>
    import { goto } from "$app/navigation";
    import Nsdb from "$lib/components/NSDB.svelte";
    import "@ui5/webcomponents-icons/dist/task"
</script>
<Nsdb></Nsdb>
<div class="row">
  <div class="col">
    <a href="/app/query"><ui5-button icon="task">Run Qurey</ui5-button></a>
  </div>
</div> 
