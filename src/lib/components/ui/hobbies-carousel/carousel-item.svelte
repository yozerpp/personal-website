<script>
	import { getEmblaContext } from "./context.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
        orientation,
		...restProps
	} = $props();

</script>

<div
	bind:this={ref}
	data-slot="carousel-item"
	role="group"
	aria-roledescription="slide"
	class={cn(
		"min-w-0 shrink-0 grow-0 basis-full w-full h-full",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
