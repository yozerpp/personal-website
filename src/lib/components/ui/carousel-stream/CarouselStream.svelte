<script>
    import * as Carousel from './index.js';
    import {cn, toStyleString} from "@/utils.js";
    import {onMount} from "svelte";
    /**@type import('./types').CarouselStreamProps */
    let {
        controls = $bindable(),
        slides,
        class: className,
        orientation = "horizontal",
        animation,
        speed = 3,
        width
    } = $props();
    let widthString = $derived(toStyleString(width, 'w'));
    const autoScroll = $derived(()=>{
        slide.scrollLeft+= speed;
        loopId = requestAnimationFrame(autoScroll);
    })
    /**@type HTMLElement */
    let slide=null;
    /**@type {HTMLElement[]}*/
    let items = Array(slides.length).fill(null);
    /**@type {number |null}*/
    let loopId = null;
    function startScroll(){
        if(loopId !== null) return;
        autoScroll();
    }
    function stopScroll(){
        if(loopId===null) return;
        cancelAnimationFrame(loopId);
        loopId = null;
    }
    onMount(()=>{
        startScroll();
        return stopScroll;
    })
    /**@type {number}*/
    let prevScroll = 0;
    function onscroll(){
        let add,startIdx,step;
        let pScroll = prevScroll;
        prevScroll = slide.scrollLeft;
        if(slide.scrollLeft > pScroll && slide.scrollLeft >= (slide.scrollWidth - slide.clientWidth) * 2/3){
            add = Element.prototype.after;
            startIdx = 0;
            step = 1;
        } else if(slide.scrollLeft <= pScroll && slide.scrollLeft <= (slide.scrollWidth - slide.clientWidth) / 3){
            add = Element.prototype.before;
            startIdx = items.length-1;
            step = -1;
        }
        else return;
        requestAnimationFrame(()=>{
            for(let i = startIdx, adj = items[items.length - startIdx-1];i < slides.length; i+=step){
                const e = items[i].cloneNode(true)
                add.call(adj, e);
                adj = e;
            }
            if(items.length >= 3 * slides.length)
                items.splice(step === 1?0:(items.length - slides.length), slides.length).forEach(del=>del.remove());
        })
    }
    function onmouseenter(){
        stopScroll();
    }
    let dragging = false
    function onmouseleave(){
        startScroll();
        dragging = false;

    }
    /**@param {MouseEvent} ev*/
    function onmousemove(ev){
        if(!dragging) return
        ev.preventDefault();
        slide.scrollLeft -= ev.movementX
    }
    /**@param {MouseEvent} ev*/
    function onmousedown(ev){
        ev.preventDefault();
        dragging = ev.button === 0
    }
    /**@param {MouseEvent} ev*/
    function onmouseup(ev){
        ev.preventDefault();
        dragging = !(dragging && ev.button === 0);
    }
</script>
<Carousel.Root class={cn("w-full px-2", className)} style={widthString}>
    <Carousel.Content {onscroll} {onmouseenter}  {onmouseup} {onmousemove} {onmousedown} {onmouseleave} bind:ref={slide} class="gap-5 cursor-pointer grid px-0 overflow-x-hidden grid-flow-col auto-cols-[var(--w)] {width.md?'md:auto-cols-[var(--w-md)]':''} {width.lg?'lg:auto-cols-[var(--w-lg)]':''}">
            {#each slides as slide,q (slide)}
                {@const idx = q}
                <Carousel.Item bind:ref={items[q]} data-batch={0} data-index={idx}>
                    {@render slide.snippet(slide.args)}
                </Carousel.Item>
            {/each}
    </Carousel.Content>
</Carousel.Root>
