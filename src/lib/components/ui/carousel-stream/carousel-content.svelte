<script>
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	} = $props();

</script>

<div data-slot="carousel-content" class="relative overflow-hidden">
	<div
		bind:this={ref}
		class={cn(
			"relative grid w-full grid-cols-1 grid-rows-1",
			className
		)}
		{...restProps}
	>
		{@render children?.()}
	</div>
</div>
