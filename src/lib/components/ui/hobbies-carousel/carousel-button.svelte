<script>
	import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
    import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/components/ui/button/index.js";

	let {
		ref = $bindable(null),
        forward = true,
		class: className,
		variant = "ghost",
		size = "icon",
        /** @type CarouselControls */
        controls,
        orientation,
        content,
		...restProps
	} = $props();

</script>

<Button
	data-slot="carousel-{forward ? 'next' : 'previous'}"
	{variant}
	{size}
	aria-disabled={forward ? !controls.canScrollNext() : !controls.canScrollPrev()}
	class={cn(
		"p-6 rounded-full",
		className
	)}
	onclick={forward ? controls.scrollNext : controls.scrollPrev}
	onkeydown={controls.handleKeyDown}
	{...restProps}
	bind:ref
>
    {#if content}
        {@render content.snippet(content.args)}
    {:else}
        {#if forward}
            <ArrowRightIcon class="size-4" />
        {:else}
            <ArrowLeftIcon class="size-4"/>
        {/if}
    {/if}
    <span class="sr-only">Next slide</span>
</Button>