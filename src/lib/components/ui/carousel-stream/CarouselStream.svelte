<script>
    import * as Carousel from './index.js';
    import {cn} from "@/utils.js";
    import {onMount} from "svelte";
    /**@type import('./types').CarouselStreamProps */
    let {
        controls = $bindable(),
        slides,
        class: className,
        speed = 2.5,
    } = $props();
    /**@type HTMLElement */
    let carousel=null;
    const initialLength = slides.length;
    /**@type number*/
    let windowWidth = $state();
    const isLg = $derived(windowWidth >= 1024);
    const scrollGetter = $derived( isLg ? ()=>carousel.scrollLeft : ()=>carousel.scrollTop);
    const scrollSetter = $derived(isLg ? (v)=> {
        carousel.scrollLeft = v
    } : (v)=> {
        carousel.scrollTop = v
    });
    const getScrollLength = $derived(isLg ? ()=>carousel.scrollWidth - carousel.clientWidth:()=>carousel.scrollHeight - carousel.clientHeight);
    const getMouseMovement = $derived(isLg ? (ev)=>ev.movementX : (ev)=>ev.movementY);
    const autoScroll = $derived(()=>{
        scrollSetter(scrollGetter() + speed);
        loopId = requestAnimationFrame(autoScroll);
    })
    /**@type {HTMLElement[]}*/
    let items = Array(slides.length).fill(null);
    controls={
        startScroll,
        stopScroll
    }
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
        return stopScroll;
    })
    /**@type {number}*/
    let prevScroll = 0;
    function onscrollend(){
        let addNode,startIdx,step,addArray;
        const currentScroll = scrollGetter();
        if(currentScroll > prevScroll && currentScroll >= getScrollLength() * 3/4){
            slides = [...slides, ...slides.slice(0, initialLength)];
            // addNode = Element.prototype.after;
            // addArray = Array.prototype.push;
            // startIdx = ()=>0;
            // step = 1;
        }
        // else if(slide.scrollLeft <= pScroll && slide.scrollLeft <= (slide.scrollWidth - slide.clientWidth) / 4){
        //     addNode = Element.prototype.before;
        //     addArray = Array.prototype.unshift;
        //     startIdx = ()=>items.length-1;
        //     step = -1;
        // }
        else return;
        prevScroll = currentScroll;
        // function doAdd(i, adj){
        //     const e = items[i].cloneNode(true)
        //     addNode.call(adj.val, e);
        //     adj.val = e;
        //     addArray.call(items, e);
        // }
        // requestAnimationFrame(()=>{
        //     for(let i = startIdx(), adj = {val:items[items.length - startIdx() - 1]};i < slides.length; i+=step){
        //         doAdd(i, adj)
        //     }
            // if(items.length >= 3 * slides.length){
                // let sum=0;
                // items.splice(step === 1?0:(items.length - slides.length), slides.length).forEach((del,i)=> {
                    // sum += -step * del.offsetWidth;
                    // del.remove()
                // });
                // slide.scrollLeft += sum;
            // }
        // })
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
        scrollSetter(scrollGetter() - getMouseMovement(ev));
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
<svelte:window bind:innerWidth={windowWidth}/>
<Carousel.Root class={cn("size-full", className)} >
    <Carousel.Content bind:ref={carousel} ondragstart={onmousedown} ondragend={onmouseup} {onscrollend} {onmouseenter} {onmouseup} {onmousemove} {onmousedown} {onmouseleave}
            class="overflow-y-hidden h-full w-auto lg:h-auto lg:w-full lg:overflow-y-auto lg:overflow-x-hidden
     px-0 gap-5 snap-none static grid cursor-pointer grid-flow-row auto-rows-max lg:grid-cols-none lg:grid-rows-[auto_auto_auto] lg:grid-flow-col lg:auto-rows-auto lg:auto-cols-max"
    style="overflow-anchor: none !important;">
            {#each slides as slide,q(q)}
                <Carousel.Item class="lg:w-auto lg:grid lg:grid-rows-subgrid lg:row-span-full" style>
                    {@render slide.content.snippet(slide.content.args)}
                </Carousel.Item>
            {/each}
    </Carousel.Content>
</Carousel.Root>