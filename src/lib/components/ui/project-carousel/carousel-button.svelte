<script>
    import {m} from "/src/paraglide/messages.js";
	import { cn } from "$lib/utils.js";
    let {
		ref = $bindable(null),
        forward = true,
		class: className,
        /** @type CarouselControls */
        controls,
		...restProps
	} = $props();
    const disabled = $derived(forward ? !controls.canScrollNext() : !controls.canScrollPrev());
</script>
<button
        title={forward ? m.projects_carousel_nextSlidetooltip() : m.projects_carousel_prevSlidetooltip()}
        data-slot="carousel-{forward ? 'next' : 'previous'}"
        aria-disabled={disabled}
        class={cn("size-fit p-0 text-center has-[span:not(:empty)]:bg-gray-300 m-0 cursor-grab aria-disabled:cursor-not-allowed",className)}
        onclick={forward ? controls.scrollNext : controls.scrollPrev}
        onkeydown={controls.handleKeyDown}
        {...restProps}
        bind:this={ref}
><span  class="min-w-0 size-fit text-xl caret cursor-pointer">
    {#if !disabled}
        {forward ? ">" : "<"}
    {/if}
</span></button>
