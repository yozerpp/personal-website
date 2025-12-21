<script>
    import * as Carousel from "@/components/ui/project-carousel/index.js";
    import { cubicOut } from "svelte/easing";
    import {cn} from "@/utils.js";
    import {onMount, tick} from "svelte";
    /** @type {import('./types').CarouselProps} */
    let {
        controls = $bindable(null),
        slides,
        class: className,
        orientation = "horizontal",
        animation = (
            node,
            {
                delay = 0,
                duration = 500,
                easing = cubicOut,
                toLeft = true,
                coming = true,
            }
        ) => {
            const property = (toLeft && coming || !toLeft && !coming)?"left":"right";
            const start = coming ? 100 : 0;
            const end = coming ? 0 : 100;
            return {
                delay,
                duration,
                easing,
                css: (t, u) => {
                    const value = start + (end - start) * (coming ? t : u);
                    const inactiveProp = property === "left" ? "right" : "left";
                    return `${inactiveProp}: auto; ${property}: ${value}%;`;
                },
            };
        },
        nextClass,
        prevClass,
        nextContent,
        prevContent
    } = $props();
    let index = $state({current: -1, previous: 0});
    const canScrollNext = $derived(index.current < slides.length - 1);
    const canScrollPrev = $derived(index.current > 0);
    controls = {
        scrollPrev,
        scrollNext,
        scrollTo,
        canScrollPrev: ()=>canScrollPrev,
        canScrollNext: ()=>canScrollNext,
        handleKeyDown,
    };
    function scrollPrev() {
        if (slides.length === 0) return;
        const nextIndex = (index.current - 1 + slides.length) % slides.length;
        index = {previous: index.current,current: nextIndex};
    }
    function scrollNext() {
        if (slides.length === 0) return;
        const nextIndex = (index.current + 1) % slides.length;
        index = {previous: index.current,current: nextIndex};
    }
    function scrollTo(toIndex) {
        if (slides.length === 0) return;
        const target = ((toIndex % slides.length) + slides.length) % slides.length;
        if (target === index.current) return;
        index = {previous: index.current,current: target};
    }
    function handleKeyDown(e) {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollPrev();
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollNext();
        }
    }
    onMount(async ()=> {
        index.current = 0;
        await tick();
    })
</script>

<Carousel.Root onkeydown={handleKeyDown} class={cn("w-full", className)}>
    <Carousel.Content class="grid items-stretch justify-stretch content-stretch">
        {#each slides as slide, i (slide)}
            {@const toLeft = index.current > index.previous}
            {#if i === index.current}
                <div
                    class="relative col-start-1 row-start-1"
                    in:animation={{toLeft, coming: true}}
                    out:animation={{toLeft, coming: false}}
                >
                    <Carousel.Item {orientation} {index}>
                        <div class="h-full w-full p-1">
                            {@render slide.snippet(slide.args)}
                        </div>
                    </Carousel.Item>
                </div>
            {/if}
        {/each}
    </Carousel.Content>
    <div class="grid grid-cols-2 w-full place-items-center">
        <Carousel.Button {controls} class={prevClass} content={prevContent} {orientation}/>
        <Carousel.Button {controls} class={nextClass} content={nextContent} {orientation}/>
    </div>
</Carousel.Root>
