<script>
    import {onMount} from "svelte";
    import {cn} from "@/utils.js";

    /**@type import('./types').TimelineProps*/
    let {
        elements,
        separatorLength = 0,
        class: className,
        title,
    } = $props()
    /**@typedef {{header: HTMLElement | null, padding: number, content: HTMLElement, item: HTMLElement, index: number}} itemLive*/
    /**@type {itemLive[]}*/
    const items = [];
    /**@type HTMLElement*/
    let root = null;
    /**@type HTMLElement*/
    let titleElement;
    /**@param {itemLive} arg
     * @return {number} header size
     * */
    function adjustTop(sum, {item, header, padding}){
        item.style.setProperty('top', sum + 'px');
        // if(index === elements.length - 1)
        //     return item.clientHeight;
        return (header!=null ? (header.offsetHeight + separatorLength) : 0) + padding;
    }
    function resize(){
        if(!items.length) return
        let headerSum = titleElement?.offsetHeight ?? 0;
        root.style.gap = root.parentElement.clientHeight * 4/5 + 'px';
        items.forEach(i=>{
            i.padding = parseFloat(getComputedStyle(i.item).paddingTop.replace('px', ''))
            headerSum+=adjustTop(headerSum, i);
        })
        const trackPadding = (root.parentElement.clientHeight - (headerSum - items[items.length - 1].header.offsetHeight) - items[items.length - 1].item.clientHeight);
        if(trackPadding >= 0) root.style.paddingBottom = trackPadding + 'px';
        else{
            root.parentElement.style.height = (-trackPadding + parseFloat(getComputedStyle(root.parentElement).height.replace('px', '')) ) +  'px';
            // const maxScroll = root.scrollHeight - trackPadding;
            // let prevScrollTop = root.scrollTop;
            // root.addEventListener('scroll', ev=>{
            //     console.log("balls")
            //     if(root.scrollTop > maxScroll){
            //         ev.stopPropagation()
            //         ev.preventDefault();
            //     }else prevScrollTop = root.scrollTop;
            // });
        }
        // items.forEach(i=>{
        //     i.item.style.setProperty('view-timeline-inset', (i.item.offsetTop/root.clientHeight*100).toString() + '% -60px')
        // })
    }
    onMount(()=>{
        for (const item of root.children){
            items.push({item});
        }
        console.log(items);
        items.forEach((i)=>{
            i.header= i.item.querySelector("[data-timeline-slot='header']")
            i.content = i.item.querySelector("[data-timeline-slot='content']") ?? i.item;
        })
        resize();
        const obs = new ResizeObserver(()=>{
            resize();
        })
        obs.observe(root);
        return obs.disconnect;
    })
    function bindNode(node, index){
        items[index].item = node;
    }
</script>

<div class="h-[30dvh] md:h-[60dvh] lg:h-[70dvh] overflow-auto p-0 root">
    {#if title}
        <div bind:this={titleElement} class="text-center sticky top-0 py-6">
            {#if typeof title ==='string'}
                    <h1 class="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-['Inter'] text-accent text-shadow-md text-shadow-accent-foreground">{@html title}</h1>
            {:else}
                {@render title.snippet(title.args)}
            {/if}
        </div>
    {/if}
    <ul bind:this={root} class="relative pt-[100%] grid grid-rows-{elements.length} justify-items-center items-start">
        {#each elements as elem, i (i)}
            <li class={cn("h-full drop-shadow-lg drop-shadow-muted-foreground sticky", className)} style="z-index: {i};">
                {@render elem.content.snippet(elem.content.args)}
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
                var(--color-accent) 0px 10px,
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