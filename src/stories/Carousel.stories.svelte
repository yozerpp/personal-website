<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
    import * as Card from "@/components/ui/card/index.js";
	import CarouselComponent from "@/components/ui/project-carousel/Carousel.svelte";
	const { Story } = defineMeta({
		title: "Components/Carousel/Terminal",
		component: CarouselComponent,
		tags: ["autodocs"],
		parameters: {
		},
		argTypes: {
			animation: {
				control: false,
				description:
					"Transition function of the carousel",
			},
			rootClass: {
				control: { type: "text" },
				description: "Additional classes merged onto the Carousel root container.",
			},
			contentClass: {
				control: { type: "text" },
				description: "Classes applied to the embla track element.",
			},
			prevClass: {
				control: { type: "text" },
				description: "Classes forwarded to the previous button when using the default control.",
			},
			nextClass: {
				control: { type: "text" },
				description: "Classes forwarded to the next button when using the default control.",
			},
			slides: {
				control: false,
				description: "Snippet array rendered inside the Carousel content.",
			},
            controls: {
                control: false,
                description: "Two-way bound Embla API instance exposed by Carousel.Root.",
            },
		},
		args: {
			slides: Array(5).keys().map((_,i)=>({snippet: slideSnippet, args: {number:i}})).toArray(),
            rootClass: "p-1"
			// rootClass: "shadow-xl bg-white/90 backdrop-blur",
			// contentClass: "h-40",
			// prevClass: "left-2 bg-slate-900/80 text-white",
			// nextClass: "right-2 bg-slate-900/80 text-white",
		},
	});
</script>
{#snippet slideSnippet({number})}
    <Card.Root>
        <Card.Content
                class="flex aspect-square items-center justify-center p-6"
        >
            <span class="text-4xl font-semibold">{number + 1}</span>
        </Card.Content>
    </Card.Root>
{/snippet}
<Story name="Test" />
