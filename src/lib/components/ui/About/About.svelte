<script>
    import {fly as textAnimation} from "svelte/transition";
    import {m} from '$paraglide/messages.js';
    import {backInOut as easing} from "svelte/easing";
    import {cn} from "@/utils.js";
    /**@type import('./types').AboutProps*/
    let {
        title = m.about_title(),
        text,
        class:className,
        show = true,
    } = $props();
    /**@type {number}*/
    let textWidth = $state();
    /**@type {number}*/
    let textHeight = $state();
    /**@type {number}*/
    let windowWidth= $state();
    const isLg = $derived(windowWidth >= 1024);
    const animArg = $derived({delay: 300, easing,duration:2000, y:!isLg ?-(textHeight + 10):0, x:isLg? -(textWidth+16) : 0, opacity:1})
</script>
<svelte:window bind:innerWidth={windowWidth}/>
<div class={cn("grid grid-rows-[auto_auto] px-3 lg:grid-cols-[auto_auto] lg:px-[10%]", className)}>
    <div class="flex border-none pe-0 me-0 opacity-100 shadow-accent justify-between content-center items-center
    shadow-lg flex-col [clip-path:inset(0_0_-100%_0)] lg:shadow-2xl lg:flex-row lg:[clip-path:polygon(0_0,_200%_0,_200%_100%,_0_100%)]">
        <div class="w-fit text-accent text-shadow-muted text-shadow-md text-2xl md:text-2xl lg:text-3xl py-3 md:py-5 lg:py-6 xl:py-10 mx-2">
            <h1 class="about-title">{ isLg ? title.toLocaleUpperCase() : title}</h1>
        </div>
        <div class="rounded-lg w-full lg:w-auto lg:h-full border-amber-400/80 border-[2px] bg-amber-400/80"></div>
    </div>
    {#if show}
        <div class="content-center items-center overflow-y-hidden px-3 lg:pe-10 lg:h-full lg:overflow-x-hidden">
            <p bind:offsetHeight={textHeight} bind:offsetWidth={textWidth} in:textAnimation|global={animArg}
                class="text-accent  size-fit mt-3 text-center text-md lg:text-lg lg:ms-3 font-['Inter'] font-medium lg:text-start">
                {#if typeof text ==='string'}
                    {@html text}
                {:else}
                    {@render text.snippet(text.args)}
                {/if}
            </p>
        </div>
    {/if}
</div>
<style>
    .about-title{
        @media (width >= 64rem /* 1024px */) {
            writing-mode: vertical-lr;
            text-orientation: upright;
        }
    }
</style>