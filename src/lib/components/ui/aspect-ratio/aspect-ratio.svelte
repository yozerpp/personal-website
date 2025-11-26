<script>
	import { AspectRatio as AspectRatioPrimitive } from "bits-ui";

	let { ref = $bindable(null), class: classNames, ...restProps } = $props();
</script>

<AspectRatioPrimitive.Root bind:ref data-slot="aspect-ratio" class={classNames} {...restProps} />