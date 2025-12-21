<script>
    import {cn} from "@/utils.js";

    /**@type {{title:string, items: import('$lib/components/ui/types').SnippetHolder[], class?:string | undefined}}*/
    let {
        title,
        items,
        class:className,
    } = $props();
</script>
<div class={cn("flex flex-col w-fit h-full gap-1 md:gap-3", className)}>
    <h2 class="text-md md:text-lg lg:text-xl text-start  font-semibold text-gray-300">{@html title}</h2>
    <ul class="font-light flex flex-col gap-1 md:gap-3 px-2 lg:px-4 list-disc">
        {#each items as item,i(item)}
            <li class="text-muted/60 group text-sm hover:scale-105 focus:scale-105 transition-transform md:text-md lg:text-lg border-b-1 border-b-muted/30  size-fit">
                {@render item.snippet(item.args)}
            </li>
        {/each}
    </ul>
</div>
<style>
</style>