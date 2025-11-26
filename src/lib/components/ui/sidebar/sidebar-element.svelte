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
</script>
<a
    {href}
    onmouseenter={() => mouseOver = true}
    onmouseleave={() => mouseOver = false}
    tabindex="-1"
    class="group cursor-pointer overflow-hidden place-items-center py-2 px-[15%] md:py-[15%] md:px-2">
    <div class={cn("grid px-4 py-2 rounded-4xl place-items-center overflow-hidden h-full transition-[background-color,height,width]  bg-inherit group-focus:drop-shadow-blue-200 group-focus:drop-shadow-sm group-focus:bg-gray-400/80 group-hover:drop-shadow-blue-200  group-hover:drop-shadow-sm group-hover:bg-gray-400/80", className)}>
        {#if mouseOver || reveal}
            <p transition:nameAnimation class="text-center overlap p-0 m-0 text-shadow-black text-shadow-xs text-white text-md font-semibold">{name}</p>
        {:else}
            <div class="overlap" transition:imageAnimation>
                <Avatar.Root class="drop-shadow-black/80 drop-shadow-lg">
                    <Avatar.Image src={image}/>
                    <Avatar.Fallback>{name}</Avatar.Fallback>
                </Avatar.Root>
            </div>
        {/if}
    </div>

</a>
<style>
    .overlap{
        grid-row: 1/1;
        grid-column: 1/1;
    }
</style>