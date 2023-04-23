<script>
    import {json} from "@codemirror/lang-json"
    import CodeMirror from "svelte-codemirror-editor";
    import {theme} from '$lib/stores/auth'
    import { oneDark } from "@codemirror/theme-one-dark";
    import { onMount } from "svelte";
    export let output = "";  
    let isDark = false;  
    onMount( ()=>{
        if ($theme.indexOf('dark')> -1){
            isDark = true;
        }
    })
    $: $theme 
</script>
<div class="query-output">
    {#if isDark}
        <CodeMirror lang={json()} readonly bind:value={output} theme={oneDark}></CodeMirror>
    {:else}
        <CodeMirror lang={json()} readonly bind:value={output}></CodeMirror>
    {/if}
</div>
<style>
    .query-output{
        display: block;
        flex-direction: row;
        flex-grow: 1;
        resize:vertical;
        overflow: auto;
        width: 100%;
}
</style>