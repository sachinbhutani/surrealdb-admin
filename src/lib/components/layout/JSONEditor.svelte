<script>
    import { onMount } from "svelte";
    import {theme} from '$lib/stores/auth'
    import {browser} from '$app/environment'
    import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
    
    let divEl;
    let editor;
    let Monaco;
    export let output;
    export let updateEditor;
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
                value: JSON.stringify(output,null,2),
                language: "json",
                theme: monacoTheme,
                readOnly: false,
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

        const updateOutput = () => {
            try {
                let j= JSON.parse(editor.getValue())
                output = j
            }catch{
                console.log("invalid json, ignored")
            }
        }
        editor.onDidChangeModelContent(updateOutput)
        //editor.onDidContentSizeChange(updateHeight);
        updateHeight();

        return () => {
        editor.dispose();
        };
    });

    updateEditor = () =>{
        if (browser && editor){
            if (typeof output == "object")
            editor.setValue(JSON.stringify(output,null,2))
        }
    }
    // function updateOutput(ouput){
    //     if (editor){
    //         editor.setValue(output)
    //         editor.layout()
    //     } 
    // }
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