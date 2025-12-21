<script>
    import * as Tooltip from './index.js';
    /**@type import('./types').TooltipProps*/
    let {
        content,
        children,
    } = $props();
</script>
<Tooltip.Provider delayDuration={500}>
    <Tooltip.Root>
        <Tooltip.Trigger>{@render children()}</Tooltip.Trigger>
        <Tooltip.Content class="bg-gray-800" arrowClasses="bg-gray-800">
            {#if typeof content ==='string'}
                <p>{@html content}</p>
            {:else}
                {@render content.snippet(content.args)}
            {/if}
        </Tooltip.Content>
    </Tooltip.Root>
</Tooltip.Provider>