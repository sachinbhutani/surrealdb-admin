<script>
    import Tables from "$lib/components/layout/Tables.svelte";
    import "@ui5/webcomponents-icons/dist/task"
    import "@ui5/webcomponents/dist/Button"
    import "@ui5/webcomponents-icons/dist/add"
</script>
<div class="menu-buttons">
<a href="/app/tables/create"><ui5-button design="Positive" icon="add">New Table</ui5-button></a>
</div>
<br>
<style>
    .menu-buttons{
      display: flex;
      flex-direction: row;
      justify-content:center;
      padding-top: 0.25rem;
      gap: 10px;
    }
  </style>
<Tables></Tables>