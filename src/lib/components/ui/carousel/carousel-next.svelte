<script>
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
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
	data-slot="carousel-next"
	{variant}
	{size}
	aria-disabled={!controls.canScrollNext()}
	class={cn(
		"absolute size-8 rounded-full",
		orientation === "horizontal"
			? "-right-12 top-1/2 -translate-y-1/2"
			: "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
		className
	)}
	onclick={controls.scrollNext}
	onkeydown={controls.handleKeyDown}
	bind:ref
	{...restProps}
>
	<ArrowRightIcon class="size-4" />
	<span class="sr-only">Next slide</span>
</Button>