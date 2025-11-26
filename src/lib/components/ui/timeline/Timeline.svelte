<script>
    import {onMount} from "svelte";
    import {Separator} from "@/components/ui/separator/index.js";
    import {cn} from "@/utils.js";

    /**@type import('./types').TimelineProps*/
    let {
        elements,
        separatorLength = 0,
        class: className,
    } = $props()
    /**@typedef {{header: HTMLElement | null, padding: number, content: HTMLElement, item: HTMLElement, index: number}} itemLive*/
    /**@type {itemLive[]}*/
    let items = [];
    /**@type HTMLElement*/
    let root = null;
    /**@param {itemLive} arg*/
    function adjustTitlePadding({item, header, index, padding}){
        let ret;
        item.style.setProperty('--top', (ret = index * ( (header!=null ? (header.offsetHeight + separatorLength) : 0) + padding ) ) + 'px');
        // if(index === elements.length - 1)
        //     return item.clientHeight;
        return ret;
    }
    function resize(){
        if(!items.length) return
        let sum = 0;
        items.forEach(i=>{
            i.padding = parseFloat(getComputedStyle(i.item).paddingTop.replace('px', ''))
            sum+=adjustTitlePadding(i);
        })
        root.style.paddingBottom = 'calc(100dvh - ' + (sum/2) + 'px)'
        // items.forEach(i=>{
        //     i.item.style.setProperty('view-timeline-inset', (i.item.offsetTop/root.clientHeight*100).toString() + '% -60px')
        // })
    }
    onMount(()=>{
        resize();
        const obs = new ResizeObserver(()=>{
            resize();
        })
        obs.observe(root);
        return ()=>obs.disconnect();
    })
</script>

<div class="h-[100dvh] overflow-auto p-0 root">
    <ul bind:this={root} class="pt-[100dvh] grid relative grid-rows-{elements.length} place-items-center gap-[70dvh]" style="--pb: {2/elements.length * 100}%">
        {#each elements as elem, i (elem)}
            {@const _ = items[i] = {index: i, item: null, header: null, content: null} }
            <li bind:this={items[i].item} class={cn("sticky top-[var(--top)] timeline-item border-2 border-accent-foreground/50 bg-yellow-400 p-0 rounded-xl  z-[var(--i)]", className)} style="--i: {i};">
                {#if elem.header}
                    <div bind:this={items[i].header} >
                        {@render elem.header.snippet(elem.header.args)}
                    </div>
                    <Separator class="text-black"/>
                {/if}
                <div bind:this={items[i].content}>
                    {@render elem.content.snippet(elem.content.args)}
                </div>
            </li>
        {/each}
    </ul>
</div>

<style>
    .root{
        scrollbar-width: none;
    }
    .root::-webkit-scrollbar{
        display: none;
    }
    @keyframes grow {
        from{
            scale: .1;
            opacity: .5
        }
        50%{
            scale: 1.5;
            opacity: 1;
        }
        to{
            scale: 1;
            opacity: 1;
        }
    }
    ul::before {
        content: ""; /* Required to render the pseudo-element */
        height: 100%;
        width: 2px;
        top: 0;
        left: 50%; /* Good practice to anchor it, though defaults usually work */
        position: absolute;
        /*border-left-style: dashed;*/
        /*border-left-color: black; !* Changed from 'color' to 'background-color' *!*/
        border-left-width: 2px;
        border-image: repeating-linear-gradient(
                to bottom,
                black 0px 10px,
                transparent 0px 50px
        ) 1;
    }
    .timeline-item {
        /*view-timeline-name: --timeline-animation;*/
        /*view-timeline-axis: y;*/
        /*view-timeline-inset: auto var(--top, auto);*/
        /*animation-name: grow;*/
        /*animation-range: entry 0% cover 30%;*/
        /*animation-timing-function: linear;*/
        /*animation-fill-mode: forwards; !* IMPORTANT: Keeps the 100% styles after the animation finishes *!*/
        /*animation-timeline: --timeline-animation; !* Shorthand for view(block) *!*/
        /*animation-duration: 1s; !* Duration is just a placeholder, scroll controls the "time" *!*/
    }
</style>