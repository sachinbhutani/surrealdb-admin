<script>
    import "@ui5/webcomponents-icons/dist/task"
    import "@ui5/webcomponents-icons/dist/overlay"
    import "@ui5/webcomponents-icons/dist/provision"
    import "@ui5/webcomponents/dist/Card";
    import "@ui5/webcomponents/dist/CardHeader";
    import "@ui5/webcomponents-icons/dist/sap-box"
    import {authenticatedUser} from '$lib/stores/auth'
    import "@ui5/webcomponents-icons-tnt/dist/data-store"
    import { goto } from "$app/navigation";

    function handleCardClick(event){
      let link = event.target.getAttribute("data-link") ?? "/app"
      goto(link);
    }
</script>
<br>
<div class="home-tiles">
  <ui5-card class="small" >
    <ui5-card-header interactive data-link="/app/nsdb" on:click={handleCardClick} on:keydown={handleCardClick} slot="header" title-text="Namespace" subtitle-text="{$authenticatedUser.namespace}">
      <ui5-icon name="sap-box" slot="avatar"></ui5-icon>
    </ui5-card-header>
  </ui5-card>
  <ui5-card class="small">
    <ui5-card-header interactive data-link="/app/nsdb" on:click={handleCardClick} on:keydown={handleCardClick} slot="header" title-text="Database" subtitle-text="{$authenticatedUser.database}">
      <ui5-icon name="tnt/data-store" slot="avatar"></ui5-icon>
    </ui5-card-header>
  </ui5-card>
  <ui5-card class="small">
    <ui5-card-header interactive data-link="/app/query" on:click={handleCardClick} on:keydown={handleCardClick} slot="header" title-text="Run Queries" subtitle-text="Run SurrealQL queries">
      <ui5-icon name="task" slot="avatar"></ui5-icon>
    </ui5-card-header>
  </ui5-card>
</div>
<div class="home-tiles">
  <ui5-card class="small" >
    <ui5-card-header interactive data-link="/app/tables" on:click={handleCardClick} on:keydown={handleCardClick} slot="header" title-text="Tables" subtitle-text="Browse Tables">
      <ui5-icon name="table-view" slot="avatar"></ui5-icon>
    </ui5-card-header>
  </ui5-card>
  <ui5-card class="small">
    <ui5-card-header interactive data-link="/app/tables/create" on:click={handleCardClick} on:keydown={handleCardClick} slot="header" title-text="Create Table" subtitle-text="Create New Table">
      <ui5-icon name="provision" slot="avatar"></ui5-icon>
    </ui5-card-header>
  </ui5-card>
</div>
<div class="home-tiles">
  <ui5-card class="small" >
    <ui5-card-header interactive data-link="/app/scopes" on:click={handleCardClick} on:keydown={handleCardClick} slot="header" title-text="Scopes" subtitle-text="Browse Scopes">
      <ui5-icon name="overlay" slot="avatar"></ui5-icon>
    </ui5-card-header>
  </ui5-card>
</div>
<style>
  .home-tiles{
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 10px;
    padding:10px;
  }
  .small {
    width: 20%;
    min-width: 200px;
  }
</style>

