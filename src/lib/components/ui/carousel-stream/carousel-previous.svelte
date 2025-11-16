<script>
	import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/components/ui/button/index.js";

	let {
		ref = $bindable(null),
		class: className,
		variant = "outline",
		size = "icon",
        /** @type CarouselControls */
        controls,
        orientation,
		...restProps
	} = $props();

</script>

<Button
	data-slot="carousel-previous"
	{variant}
	{size}
	aria-disabled={!controls.canScrollPrev()}
	class={cn(
		"absolute size-8 rounded-full",
		orientation === "horizontal"
			? "-left-12 top-1/2 -translate-y-1/2"
			: "-top-12 left-1/2 -translate-x-1/2 rotate-90",
		className
	)}
	onclick={controls.scrollPrev}
	onkeydown={controls.handleKeyDown}
	{...restProps}
	bind:ref>
	<ArrowLeftIcon class="size-4" />
	<span class="sr-only">Previous slide</span>
</Button>