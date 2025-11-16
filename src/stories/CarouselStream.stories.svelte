<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import CarouselStream from "@/components/ui/carousel-stream/CarouselStream.svelte";
    import * as Card from '$lib/components/ui/card/index.js';
    const { Story } = defineMeta({
        title: "Components/Carousel/Stream",
        component: CarouselStream,
        tags: ["autodocs"],
        parameters: {
        },
        argTypes: {
            animation: {
                control: false,
                description:
                    "Transition function of the carousel",
            },
            class: {
                control: { type: "text" },
                description: "Additional classes merged onto the Carousel root container.",
            },
            slides: {
                control: false,
                description: "Snippet array rendered inside the Carousel content.",
            },
            controls: {
                control: false,
                description: "Two-way bound Embla API instance exposed by Carousel.Root.",
            },
            width:{
                control: {type: 'text'}
            },
            speed:{
                control:{type: 'number'}
            }
        },
        args: {
            slides: Array(5).keys().map((_,i)=>({snippet: slideSnippet, args: {number:i}})).toArray(),
            class: "p-1",
            width: "15rem",
            // rootClass: "shadow-xl bg-white/90 backdrop-blur",
            // contentClass: "h-40",
            // prevClass: "left-2 bg-slate-900/80 text-white",
            // nextClass: "right-2 bg-slate-900/80 text-white",
        },
    });
</script>
{#snippet slideSnippet({number})}
    <Card.Root class="inset-shadow-accent-foreground inset-shadow-xs">
        <Card.Content
                class="flex aspect-auto items-center justify-center p-6"
        >
            <span class="text-4xl font-semibold">{number + 1}</span>
        </Card.Content>
    </Card.Root>
{/snippet}

<Story name="Test" />