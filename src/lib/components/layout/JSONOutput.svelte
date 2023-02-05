<script>
    import { onMount } from "svelte";
    import {theme} from '$lib/stores/auth'
    import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
    import { browser } from "$app/environment";
    
    let divEl;
    let editor;
    let Monaco;
    export let output;
    $: output, updateEditor()
        onMount(async () => {
        self.MonacoEnvironment = {
        getWorker: function (_moduleId, label) {
            return new jsonWorker();
        },
        };
        let monacoTheme = "vs-light";
        if ($theme.indexOf('dark') > -1) {
            monacoTheme = "vs-dark"
        }
        Monaco = await import("monaco-editor");
        editor = Monaco.editor.create(divEl, {
                value: output,
                language: "json",
                theme: monacoTheme,
                readOnly: true,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                minimap: {
                    enabled: false,
                    }
                });
        const updateHeight = () => {
            const contentHeight = Math.min(2000, editor.getContentHeight());
            if(divEl){
                divEl.style.height = `${contentHeight}px`;
                editor.layout();
            }
            };
        editor.onDidContentSizeChange(updateHeight);
        updateHeight();

        return () => {
        editor.dispose();
        };
    });

    function updateEditor(){
        if (browser && editor) {
            editor.setValue(output);
        }
    }

</script>
<div class="query-output" bind:this={divEl}></div>
<style>
    .query-output{
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        resize:vertical;
        overflow: auto;
    }
</style>