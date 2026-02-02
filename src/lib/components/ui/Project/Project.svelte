<script>
    import {cn, makeId} from "@/utils.js";
    import VideoPlayer from "@/components/ui/video-player/VideoPlayer.svelte";
    import {scale as videoAnimation} from "svelte/transition";
    import {quintIn, quintOut} from "svelte/easing";
    import {m} from "$paraglide/messages.js";
    import {CarouselButton} from "@/components/ui/project-carousel/index.js";
    /** @type import('./types').ProjectProps */
    let {
        ref = $bindable(),
        title,
        description,
        footer,
        videoUrl,
        class:classNames,
        controls,
        ...restProps
    } = $props()
    let first = true;
    const animationDuration = 1300;
    const hookedAnimation = (node, params, options)=>{
        if(options.direction === 'out') return videoAnimation(node, params, options);
        let delay;
        if(first){
            delay = params.delay;
            first = false;
        }
        else
            delay = params.duration;
        return videoAnimation(node, {...params, delay}, options);
    }
</script>
<div id={makeId(title)} class={cn("grid grid-rows-subgrid row-span-full gap-3 pt-10 my-3", classNames)} {...restProps}>
    <div class="grid w-full py-0 pb-4 px-10 md:px-15 lg:px-20 my-0 place-items-end justify-items-center grid-cols-1 gap-5 md:gap-0 {videoUrl ? 'md:grid-cols-[auto_1fr]' : ''}">
        {#if videoUrl}
            <div class="size-full" in:hookedAnimation|global={{easing: quintOut,delay:500, duration: animationDuration, opacity: .6}} out:hookedAnimation|global={{easing: quintOut, duration: animationDuration, opacity: .6}}>
                <VideoPlayer class="border-1 border-gray-300/70 p-0 size-full rounded-xl" {videoUrl}/>
            </div>
        {/if}
        <div class="size-full flex flex-row justify-center items-end gap-3">
            <CarouselButton forward={false} {controls}/>
            <div class="text-yellow-50 text-shadow-lime-200 text-shadow-2xs text-center text-2xl md:text-3xl lg:text-5xl ">
                {#if typeof title ==='string'}
                    {@html title}
                {:else }
                    {@render title.snippet(title.args)}
                {/if}
            </div>
            <CarouselButton {controls}/>
        </div>

    </div>
    <div class="text-start my-3">
        <div class="md:text-lg text-center lg:text-2xl min-h-50 md:min-h-70 text-green-500 text-shadow-cyan-300 text-shadow-xs">
            {#if typeof description ==='string'}
                {@html description}
            {:else}
                {@render description.snippet(description.args)}
            {/if}
        </div>
    </div>
        <div class="pt-2 text-sm md:text-md md:pt-3 border-dashed border-t-2 border-t-gray-300/80 font-semibold text-lime-200 text-shadow-none w-full flex flex-row pe-6 justify-start text-start">
            {#if typeof footer === 'string'}
                {@html footer}
            {:else if Array.isArray(footer)}
                <span class="me-3">{m.links()}:</span>
                {#each footer as footerElem,i (footerElem)}
                    {#if i >0}
                        <span>,&nbsp;</span>
                    {/if}
                    <a target="_blank" class="underline hover:scale-110" href={footerElem.href} download={footerElem.download}><p>{footerElem.text}</p></a>
                {/each}
            {:else if footer}
                {@render footer.snippet(footer.args)}
            {/if}
        </div>
</div>

<style>

    .gradient-font{
        background: linear-gradient(135deg,    var(--color-yellow-200), var(--color-lime-100),var(--color-neutral-50));
        -webkit-background-clip: text; /* Clips background to the shape of text */
        background-clip: text;
        color: transparent; /* Makes the text fill invisible */
    }

</style>