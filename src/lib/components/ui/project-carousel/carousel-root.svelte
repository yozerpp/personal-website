<script>
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="carousel"
	class={cn("relative", className)}
	role="menu"
	aria-roledescription="carousel"
	{...restProps}
>
	{@render children?.()}
</div>
