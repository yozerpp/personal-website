<script>
    import {cn} from "@/utils.js";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import {slide} from "svelte/transition";
    import {cubicOut} from 'svelte/easing';
    /** @type import('./types').SidebarElement */
    let {
        name,
        href,
        image,
        imageAnimation = (node, {delay = 0, duration = 500, easing = cubicOut}, options) => slide(node, {delay, duration, easing, axis: 'y'}),
        nameAnimation = (node, {delay= 0, duration = 500, easing= cubicOut}, options) => slide(node, {delay, duration, easing, axis: 'x'}),
            // (node, {delay, duration, easing=cubicOut}, options)=>{
            // const s = scale(node, {delay, duration, easing});
            // const f = fade(node, {delay, duration, easing});
            // return {
            //     duration,
            //     delay,
            //     easing,
            //     css: (t, u)=>{
            //         const css1 = s.css(t,u)
            //         const css2 = f.css(t, u)
            //         return css1 + ' ' + css2;
            //     }
            // }
        // },
        class:className,
        reveal = false,
    } = $props();
    let mouseOver = $state(false);
    const focusClassList = [
        "drop-shadow-blue-200",
        "drop-shadow-sm",
        "bg-gray-400/80",
    ];
    const hoverClassList = [
        "drop-shadow-blue-200",
        "drop-shadow-sm",
        "bg-gray-400/80"
    ];
</script>
<a
    {href}
    onmouseenter={() => mouseOver = true}
    onclick={() => {reveal = true; mouseOver = false}}
    onmouseleave={() => mouseOver = false}
    tabindex="-1"
    aria-current={reveal}
    class={cn("group cursor-pointer overflow-hidden place-items-center lg:py-[15%]",
    "grid py-1 px-0.5 lg:px-2 lg:py-1 rounded-4xl place-items-center overflow-hidden h-full transition-[background-color,height,width] bg-inherit",
    "group-focus:drop-shadow-blue-200 group-focus:drop-shadow-sm group-focus:bg-gray-400/80 group-hover:drop-shadow-blue-200 group-hover:drop-shadow-sm group-hover:bg-gray-400/80 aria-[current=true]:drop-shadow-blue-200 aria-[current=true]:drop-shadow-sm aria-[current=true]:bg-gray-400/80",
    className)}
>
    {#if mouseOver || reveal}
        <p transition:nameAnimation class="text-center overlap p-0 m-0 text-shadow-black text-shadow-xs text-white text-xs md:text-sm lg:text-md font-semibold">{name}</p>
    {:else}
        <div class="overlap flex flex-row p-1 md:p-1.5 text-center items-center justify-center drop-shadow-black/80 size-[1.75rem] lg:size-[2.5rem]  drop-shadow-lg" transition:imageAnimation>
            {#if typeof image ==='string'}
            <Avatar.Root class="">
                <Avatar.Image src={image}/>
                <Avatar.Fallback>{name}</Avatar.Fallback>
            </Avatar.Root>
            {:else}
                {@const Elem = image}
                <Elem class="text-muted/75 drop-shadow-xs drop-shadow-muted size-full"/>
            {/if}
        </div>
    {/if}
</a>
<style>
    .overlap{
        grid-row: 1/1;
        grid-column: 1/1;
    }
</style>