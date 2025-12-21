<script>
    import * as Carousel from "@/components/ui/project-carousel/index.js";
    import TerminalButton from "./terminal-button.svelte";
    import {cn} from "@/utils.js";
    import {onMount, tick} from "svelte";
    import {typewriter} from "@/components/ui/transitions.js";
    import {X, Command} from '@lucide/svelte';
    /** @type {import('./types').CarouselProps} */
    let {
        controls = $bindable(null),
        slides,
        class: className,
        orientation = "horizontal",
        title,
        animation = typewriter
            // (
            // node,
            // {
            //     delay = 0,
            //     duration = 500,
            //     easing = cubicOut,
            //     toLeft = true,
            //     coming = true,
            // }
        // ) => {
        //     const property = (toLeft && coming || !toLeft && !coming)?"left":"right";
        //     const start = coming ? 100 : 0;
        //     const end = coming ? 0 : 100;
        //     return {
        //         delay,
        //         duration,
        //         easing,
        //         css: (t, u) => {
        //             const value = start + (end - start) * (coming ? t : u);
        //             const inactiveProp = property === "left" ? "right" : "left";
        //             return `${inactiveProp}: auto; ${property}: ${value}%;`;
        //         },
        //     };
        // },
    } = $props();
    let index = $state({current: -1, previous: 0});
    let activeList = slides.map((_,i)=>i===0);
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
    function setIndex(nextIndex){
        index = {previous: index.current, current: nextIndex};
        activeList[index.previous] = false;
        activeList[index.current] = true;
    }
    function scrollPrev() {
        if (slides.length === 0) return;
        const nextIndex = (index.current - 1 + slides.length) % slides.length;
        setIndex(nextIndex)
    }
    function scrollNext(){
        if (slides.length === 0) return;
        const nextIndex = (index.current + 1) % slides.length;
        setIndex(nextIndex)
    }
    function scrollTo(toIndex) {
        if (slides.length === 0) return;
        const target = ((toIndex % slides.length) + slides.length) % slides.length;
        if (target === index.current) return;
        setIndex(target)
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

    let delay = 0;
    const determineDelay = $derived((node, params, options)=>{
        return animation(node, {...params, delay}, options);
    });
    const catchDelay = $derived((node, params, options)=>{
        const conf = animation(node, {...params}, options);
        delay = conf.duration;
        return conf;
    })
    function playOrNot(node, {anim, play, ...rest}, options){
        if(play)
            return anim(node, rest, options);
        return {duration: 0};
    }
    /**@type number*/
    let mediaWidth =$state();
    const isMediaLg = $derived(mediaWidth > 1024);
    const isMediaMd = $derived(mediaWidth > 768);
</script>
<svelte:window bind:innerWidth={mediaWidth}/>
{#snippet terminalTab(slide, i)}
    <button role="tab" id="projectTab_{slide.title.replace( /\s+/,'_').toLowerCase()}" on:click={scrollTo.bind(null,i)}
            class="text-xs md:text-md lg:text-lg gap-0 transition-colors {index.current ===i ? 'bg-gradient-to-b from-neutral-700/70 via-neutral-800-90 to-neutral-950/80' : 'cursor-pointer'} text-gray-300/60 border-1 border-neutral-500/40 h-fit py-1 md:pe-2 place-items-center px-0  w-full grid grid-cols-[auto_auto_auto] ">
        <X class="text-start text-gray-500/40" size={isMediaMd ? 20 :15}/><span class="w-full text-center ">{@html slide.title}</span><div class="flex flex-row justify-start gap-1 items-center"><Command size={isMediaMd ? 20:15}/><span>{i+1}</span></div>
    </button>
{/snippet}
<div on:scrollNext on:scrollPrev class={cn("terminal size-fit p-0 shadow-lg shadow-black rounded-4xl border-accent-foreground border-4", className )}>
    <Carousel.Root onkeydown={handleKeyDown} class="container size-fit">
        <div class="relative flex flex-row items-center">
            <div class="grid grid-cols-3 p-0 mb-2 gap-2 w-fit m-4">
                <TerminalButton class="bg-red-800"></TerminalButton>
                <TerminalButton class="bg-yellow-400"></TerminalButton>
                <TerminalButton class="bg-green-600"></TerminalButton>
            </div>
            {#if title}
                <h2 class="absolute text-center left-[50%] text-gray-300/80 md:text-lg xl:text-xl transform-[translateX(-50%)]">{title}</h2>
            {/if}
        </div>
        <div role="tablist" class="grid grid-cols-{slides.length} w-full bg-gradient-to-b from-neutral-800/70 via-neutral-900/90 to-neutral-950/80">
            {#each slides as slide,i(slide)}
                {@render terminalTab(slide, i)}
            {/each}
        </div>
        <Carousel.Content class="grid grid-cols-1 px-5 grid-rows-[2fr_3fr_0.5fr] gap-20 size-fit">
            {#each slides as slide, i (slide)}
                {#key i === index.current}
                    <div out:playOrNot={{anim:catchDelay, play: i===index.previous, speed:1.5}} in:playOrNot={{anim:determineDelay, play: i===index.current,speed:1.5}}
                         class="{i===index.current ? 'z-10' : 'opacity-0 z-0'} grid grid-rows-subgrid row-start-1 col-start-1 row-span-full">
                        <Carousel.Item class="grid grid-rows-subgrid row-span-full col-span-full" {orientation} {index}>
                            {@render slide.content.snippet({...slide.content.args,controls})}
                        </Carousel.Item>
                    </div>
                {/key}
            {/each}
        </Carousel.Content>
    </Carousel.Root>
</div>
<style>
    .terminal {
        --top-spacing: calc(var(--spacing) * 10);
        background-image: linear-gradient(135deg, var(--color-neutral-700), var(--color-neutral-800)),
        linear-gradient(135deg, var(--color-black), var(--color-stone-950), var(--color-gray-950), var(--color-neutral-950));
        background-size: 100% var(--top-spacing), 100% 100%;
        background-repeat: no-repeat, no-repeat;

        font-family: "SF Mono", "Monaco", "Inconsolata", "Fira Mono", "Droid Sans Mono", "Source Code Pro", monospace;
        /* Optional: Tighten spacing slightly for that terminal feel */
        letter-spacing: -0.5px;
    }
</style>